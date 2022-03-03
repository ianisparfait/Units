import React, { Component } from "react";
import withContext from "../withContext";
import { Redirect } from "react-router-dom";
import axios from 'axios';

const initState = {
  meubleName: "",
  meubleStock: "",
  meublePrix: 0,
  meubleInfo: "",
  meubleShortInfo: "",
  meubleType: ""
};

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = initState;
  }

  save = async (e) => {
    e.preventDefault();
    const { meubleName, meubleStock, meublePrix, meubleInfo, meubleShortInfo, meubleType } = this.state;

    if (meubleName && meublePrix) {
      const id = Math.random().toString(36).substring(2) + Date.now().toString(36);

      await axios.post(
        'http://localhost:3001/meubles',
        { id, meubleName, meubleStock, meublePrix, meubleInfo, meubleShortInfo, meubleType },
      )

      this.props.context.addMeuble(
        {
          meubleName,
          meubleStock: meubleStock || 0,
          meublePrix,
          meubleInfo,
          meubleShortInfo,
          meubleType
        },
        () => this.setState(initState)
      );
      this.setState(
        { flash: { status: 'is-success', msg: 'Produit crée avec succès' }}
      );

    } else {
      this.setState(
        { flash: { status: 'is-danger', msg: 'Entrer un nom et un prix !' }}
      );
    }
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value, error: "" });

  render() {
    const { meubleName, meubleStock, meublePrix, meubleInfo, meubleShortInfo, meubleType } = this.state;
    const { user } = this.props.context;

    return !(user && user.accessLevel < 1) ? (
      <Redirect to="/" />
    ) : (
      <>
        <div className="hero is-primary ">
          <div className="hero-body container">
            <h4 className="title">Ajouter un produit</h4>
          </div>
        </div>
        <br />
        <br />
        <form onSubmit={this.save}>
          <div className="columns is-mobile is-centered">
            <div className="column is-one-third">
              <div className="field">
                <label className="label">Nom du produit: </label>
                <input
                  className="input"
                  type="text"
                  name="meubleName"
                  value={meubleName}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="field">
                <label className="label">Stock disponible: </label>
                <input
                  className="input"
                  type="text"
                  name="meubleStock"
                  value={meubleStock}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="field">
                <label className="label">Prix: </label>
                <input
                  className="input"
                  type="number"
                  name="meublePrix"
                  value={meublePrix}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="field">
                <label className="label">Description: </label>
                <textarea
                  className="textarea"
                  type="text"
                  rows="2"
                  style={{ resize: "none" }}
                  name="meubleInfo"
                  value={meubleInfo}
                  onChange={this.handleChange}
                />
              </div>
              <div className="field">
                <label className="label">Description courte: </label>
                <input
                  className="input"
                  type="text"
                  name="meubleShortInfo"
                  value={meubleShortInfo}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="field">
                <label className="label">Type du meuble: </label>
                <input
                  className="input"
                  type="text"
                  name="meubleType"
                  value={meubleType}
                  onChange={this.handleChange}
                  required
                />
              </div>
              {this.state.flash && (
                <div className={`notification ${this.state.flash.status}`}>
                  {this.state.flash.msg}
                </div>
              )}
              <div className="field is-clearfix">
                <button
                  className="button is-primary is-outlined is-pulled-right"
                  type="submit"
                  onClick={this.save}
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        </form>
      </>
    );
  }
}

export default withContext(AddProduct);
