import axios from "axios";
import React from "react";
import withContext from "../withContext";

const Commandes = props => {
  const { commandes } = props.context;
  const commandesKeys = Object.keys(commandes || {});

  return (
    <>
      <div className="hero is-primary">
        <div className="hero-body container">
          <h4 className="title">Les commandes</h4>
        </div>
      </div>
      <br />
      <div className="container">
        <table className="table is-bordered is-striped" style={{textAlign: "center"}}>
          <thead>
            <tr>
              <th>Id commande</th>
              <th>Client</th>
              <th>Produits</th>
              <th>Quantités</th>
              <th>Adresse de livraison</th>
              <th>Montent de la commande</th>
              <th>Transporteurs</th>
              <th>État de la commande</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {commandes.map(c => {
              return (
                <tr key={c.id}>
                  <td>{c.transaction_id}</td>
                  <td>{c.user_mail}</td>
                  <td>{c.products.map(p => {
                    return (
                      <span key={p.name} style={{display: "block"}}>{p.name}</span>
                    )
                  })}</td>
                  <td>{c.products.map(p => {
                    return (
                        <span key={p.id} style={{display: "block"}}>{p.qty}</span>
                    )
                  })}</td>
                  <td>{c.adresse}, {c.city}, {c.country}</td>
                  <td>{c.amount}€</td>
                  <td>Transporteur</td>
                  <td>État</td>
                  <td>
                    <button className="button is-primary">Afficher le détail</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
};

export default withContext(Commandes);