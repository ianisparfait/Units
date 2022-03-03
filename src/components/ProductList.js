import React from "react";
import MeubleItem from "./ProductItem";
import withContext from "../withContext";

const MeubleList = props => {
  const { meubles } = props.context;

  return (
    <>
      <div className="hero is-primary">
        <div className="hero-body container">
          <h4 className="title">Nos produits</h4>
        </div>
      </div>
      <br />
      <div className="container">
        <div className="column columns is-multiline">
          {meubles && meubles.length ? (
            meubles.map((meuble, index) => (
              <MeubleItem
                meuble={meuble}
                key={index}
                addToCart={props.context.addToCart}
              />
            ))
          ) : (
            <div className="column">
              <span className="title has-text-grey-light">
                Aucun produits trouvé !
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default withContext(MeubleList);
