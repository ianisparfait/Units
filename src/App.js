import React, { Component } from "react";
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";
import axios from 'axios';
import jwt_decode from 'jwt-decode';

import AddProduct from './components/AddProduct';
import Cart from './components/Cart';
import Login from './components/Login';
import ProductList from './components/ProductList';
import Account from './components/Account';
import Commandes from './components/Commandes';

import Stripe from './components/Stripe';

import Context from "./Context";

const API_ID = "ef571cfdaab632e707a801b1e2d336e5"
const API_URL = (lat, lon) => `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_ID}&lang=fr&units=metric`

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      cart: {},
      meubles: [],
      productsInCart: null,
      promos: [],
      commandes: [],
      weather: null,
    };
    this.routerRef = React.createRef();

    this.numberCartItems = 0;
    this.city = null;
  }

  async componentDidMount() {
    let user = localStorage.getItem("user");
    let cart = localStorage.getItem("cart");

    const meubles = await axios.get(`http://localhost:3007/api/meubles`);
    const promos = await axios.get(`http://localhost:3007/api/promos`)
    const commandes = await axios.get(`http://localhost:3007/api/commandes`)
    const weather = await axios.get('https://api.openweathermap.org/data/2.5/forecast?lat=43.529743&lon=5.447427&appid=ef571cfdaab632e707a801b1e2d336e5&lang=fr&units=metric')

    user = user ? JSON.parse(user) : null;
    cart = cart? JSON.parse(cart) : {};

    this.setState({ user,  meubles: meubles.data, promos: promos.data, commandes: commandes.data, cart, weather });
  }

  login = async (email, password) => {
    const res = await axios.post(
      `http://localhost:3001/login`,
      { email, password },
    ).catch((res) => {
      return { status: 401, message: 'Unauthorized' }
    })

    if(res.status === 200) {
      const { email } = jwt_decode(res.data.accessToken)
      const user = {
        email,
        token: res.data.accessToken,
        accessLevel: email === 'admin@example.com' ? 0 : 1
      }

      this.setState({ user });
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    } else {
      return false;
    }
  }

  logout = e => {
    e.preventDefault();
    this.setState({ user: null });
    localStorage.removeItem("user");
  };

  addMeuble = (meuble, callback) => {
    let meubles = this.state.meubles.slice();
    meubles.push(meuble);
    this.setState({ meubles }, () => callback && callback());
  };

  addToCart = cartItem => {
    let cart = this.state.cart;
    if (cart[cartItem.id]) {
      cart[cartItem.id].amount += cartItem.amount;
    } else {
      cart[cartItem.id] = cartItem;
    }
    if (cart[cartItem.id].amount > cart[cartItem.id].meuble.stock) {
      cart[cartItem.id].amount = cart[cartItem.id].meuble.stock;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  removeFromCart = cartItemId => {
    let cart = this.state.cart;
    delete cart[cartItemId];
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  clearCart = () => {
    let cart = {};
    localStorage.removeItem("cart");
    this.setState({ cart });
  };

  getWeather = async (location) => {
    try {
      const response = await axios.get(API_URL(location.coords.latitude, location.coords.longitude))

      this.state.weather = response.data
    } catch(e) {
      console.log('Erreur dans getWeather', e)
    }
  }

  checkout = () => {
    console.log('call checkout function')
    if (!this.state.user) {
      this.routerRef.current.history.push("/login");
      return;
    }

    const cart = this.state.cart;

    const meubles = this.state.meubles.map(p => {
      if (cart[p.meubleName]) {
        p.meubleStock = p.meubleStock - cart[p.meubleName].amount;

        axios.put(`http://localhost:3001/meubles/${p.id}`,{ ...p })
      }
      return p;
    });

    this.setState({ meubles });
    // this.clearCart();
  };

  getUser = () => (
    this.state.user
  );

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          removeFromCart: this.removeFromCart,
          addToCart: this.addToCart,
          login: this.login,
          addMeuble: this.addMeuble,
          clearCart: this.clearCart,
          checkout: this.checkout
        }}
      >
        <Router ref={this.routerRef}>
        <div className="App">
          <nav
            className="navbar container"
            role="navigation"
            aria-label="main navigation"
          >
            <div className="navbar-brand">
              <b className="navbar-item is-size-4 ">ABC</b>
              <label
                role="button"
                className=""
                aria-label="menu"
                aria-expanded="false"
                data-target="navbarBasicExample"
                onClick={e => {
                  e.preventDefault();
                  this.setState({ showMenu: !this.state.showMenu });
                }}
              >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </label>
            </div>
              <div className={`navbar-menu ${
                  !this.state.showMenu ? "is-active" : ""
                }`}>
                <Link to="/meubles" className="navbar-item">
                  Produits
                </Link>
                {this.state.user && this.state.user.accessLevel < 1 && (
                  <Link to="/add-meuble" className="navbar-item">
                    Ajouter un produit
                  </Link>
                )}
                {this.state.user && this.state.user.accessLevel < 1 && (
                  <Link to="/commandes" className="navbar-item">
                    Commandes
                  </Link>
                )}
                <Link to="/cart" className="navbar-item cart_link">
                  Panier
                  <span
                    className="tag is-primary number_of_cart"
                    style={{ marginLeft: "5px" }}
                  >
                    {Object.keys(this.state.cart).length}
                  </span>
                </Link>
                {!this.state.user ? (
                  <Link to="/login" className="navbar-item signin_link">
                    Connexion
                  </Link>
                ) : (
                  <Link to="/" onClick={this.logout} className="navbar-item">
                    Déconnexion
                  </Link>
                )}
                {this.state.user &&
                  <Link to="/account" className="navbar-item account_link">
                    Compte
                  </Link>
                }
              </div>
              <span className="navbar-item" style={{fontSize: '11px'}}>{this.state.weather ? this.state.weather.data.city.name : ''}</span>
              <span className="navbar-item" style={{fontSize: '11px'}}>{this.state.weather ? Math.round(this.state.weather.data.list[0].main.temp) : ''}°</span>
            </nav>
            <Switch>
              <Route exact path="/" component={ProductList} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/add-meuble" component={AddProduct} />
              <Route exact path="/meubles" component={ProductList} />
              <Route exact path="/account" component={Account} />
              <Route exact path="/checkout" component={Stripe} />
              <Route exact path="/commandes" component={Commandes} />
            </Switch>
          </div>
        </Router>
      </Context.Provider>
    );
  };
};