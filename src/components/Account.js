import axios from "axios";
import React, { useState } from "react";
import withContext from "../withContext";


const Account = props => {
  const { user } = props.context;
  const userKeys = new Map(Object.entries(user || {}));

  const [commands, setCommands] = useState("");

  async function getCommands() {
    let array = []
    const getCommands = await axios.get('http://localhost:3001/commandes'),
          arrayOfCommands = getCommands.data;

    for (let index = 0; index < arrayOfCommands.length; index++) {
      if (arrayOfCommands[index].user_mail === userKeys.get('email')) {
        array.push(arrayOfCommands[index])
      }
    }
    setCommands(array)
  };

  return (
    <div>
      <div className="hero is-primary">
          <div className="hero-body container">
            <h4 className="title">Mon compte</h4>
          </div>
      </div>
      <br />

      <div className="column">
        <span className="title has-text-grey-light">
          {userKeys.get('email')}
        </span><br /><br />
        <button onClick={() => {getCommands()}} className="button is-primary">Voir mes commandes</button><br /><br />
        {commands != "" ? (
          <table className="table is-bordered is-striped" style={{textAlign: "center"}}>
            <thead>
              <tr>
                <th>Id commande</th>
                <th>Produits</th>
                <th>Quantités</th>
                <th>Adresse de livraison</th>
                <th>Montent de la commande</th>
                <th>Transporteurs</th>
                <th>État de la commande</th>
              </tr>
            </thead>
            <tbody>
              {commands.map(c => {
                return (
                  <tr key={c.id}>
                    <td>{c.transaction_id}</td>
                    <td>
                      {c.products.map(p => {
                        return (
                          <span key={p.name} style={{display: "block"}}>{p.name}</span>
                        )
                      })}
                    </td>
                    <td>
                      {c.products.map(p => {
                        return (
                            <span key={p.id} style={{display: "block"}}>{p.qty}</span>
                        )
                      })}
                    </td>
                    <td>{c.adresse}, {c.city}, {c.country}</td>
                    <td>{c.amount}€</td>
                    <td>Transporteur</td>
                    <td>État</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        ) : (<span></span>)}
      </div>
    </div>
  )
};


export default withContext(Account);