import React, { useReducer, useState } from "react";
import axios from 'axios';
import withContext from "../withContext";
import CartItem from "./CartItem";
import Stripe from './Stripe';

const Cart = props => {
  const [promo, setPromo] = useState('');
  const [tPrice, setTPrice] = useState(0);

  const { cart } = props.context;
  const cartKeys = Object.keys(cart || {});

  console.log()

  const totalPrice = (pr) => {
    let c = cart
    let total = 0;
    for (let x in c) {
      let obj = c[x]
      for (let key in obj) {
        if (obj[key].meublePrix != undefined || obj[key].meublePrix != null) {
          total = total + parseFloat(obj[key].meublePrix)
        }
      }
    }
    return reduc(pr, total)
  };

  async function setCouponPromo() {
    const getCodes = await axios.get(`http://localhost:3001/promos`),
          arrayOfCodes = getCodes.data;

    for (let index = 0; index < arrayOfCodes.length; index++) {
      if (arrayOfCodes[index].code === promo) {
        alert(`le code de - ${arrayOfCodes[index].reduction}% est appliqué`)
        return setTPrice(totalPrice(arrayOfCodes[index].reduction)) ;
      }
    }
  };

  const handleKeyDown = (e) => {
    setPromo(e.target.value)
  };

  const reduc = (pr, price) => {
    if (pr != undefined) {
      let mult = price * pr,
      div = mult / 100

      return parseFloat((price - div).toFixed(2))
    } else {
      return price
    }
  }

  const handleCo = () => {
    return props.history.push("/login");
  };


  return (
    <>
      <div className="hero is-primary">
        <div className="hero-body container">
          <h4 className="title">Mon panier</h4>
        </div>
      </div>
      <br />
      <div className="container">
        {cartKeys.length ? (
          <div className="column columns is-multiline">
            {cartKeys.map(key => (
              <CartItem
                cartKey={key}
                key={key}
                cartItem={cart[key]}
                removeFromCart={props.context.removeFromCart}
              />
            ))}
            <div className="column is-12 is-clearfix">
              <br />
              <div className="is-pulled-right">
                <button
                  onClick={props.context.clearCart}
                  className="button is-warning "
                >
                  Effacer le panier
                </button>{" "}
                {!props.context.user ? (<button onClick={handleCo} className="button is-success">Se connecter</button>) : (<Stripe price={tPrice == 0 ? totalPrice() : tPrice} datas={cart} />)}
              </div>
              <span>Prix total de la commande: {tPrice == 0 ? totalPrice() : tPrice}€</span>
            </div>
            <div className="column is-12 is-clearfix">
              <div className="column is-3 is-offset-9">
                <label>Code de réduction</label>
                <input className="input" type="text" placeholder="Entrez un code promotionel" onKeyUp={(e) => {handleKeyDown(e)}}/>
                <button className="button" onClick={() => {setCouponPromo()}}>Appliquer le coupon</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="column">
            <div className="title has-text-grey-light">Aucun articles dans le panier</div>
          </div>
        )}
      </div>
    </>
  );
};

export default withContext(Cart);
