import React from "react";

const MeubleItem = props => {
  const { meuble } = props;
  return (
    <div className=" column is-half">
      <div className="box">
        <div className="media">
          <div className="media-left">
            <figure className="image is-64x64">
              <img
                src="https://bulma.io/images/placeholders/128x128.png"
                alt={meuble.meubleShortInfo}
              />
            </figure>
          </div>
          <div className="media-content">
            <b style={{ textTransform: "capitalize" }}>
              {meuble.meubleName}{" "}
              <span className="tag is-primary">{meuble.meublePrix}€</span>
            </b>
            <div>{meuble.meubleShortInfo}</div>

            {meuble.meubleStock < 5 && meuble.meubleStock > 0 ? (
              <small className="has-text-danger">{meuble.meubleStock + " restant(s)"}</small>
            ) : meuble.meubleStock >= 5 && meuble.meubleStock < 10 ? (
              <small className="has-text-warning">{meuble.meubleStock + " restants"}</small>
            ) : meuble.meubleStock > 9 ? (
              <small className="has-text-success">{meuble.meubleStock + " restants"}</small>
            ) : meuble.meubleStock === 0 || meuble.meubleStock < 1 ? (
              <small className="icon-text has-text-danger">
                <span className="icon">
                  <i className="fas fa-exclamation-triangle"></i>
                </span>
                <span>Rupture de stock</span>
              </small>
            ) : (
              <small></small>
            )}

            <div className="is-clearfix">
              {meuble.meubleStock > 0 &&
              <button
                className="button is-small is-outlined is-primary   is-pulled-right"
                onClick={() =>
                  props.addToCart({
                    id: meuble.meubleName,
                    meuble,
                    amount: 1
                  })
                }
              >
                Ajouter au panier
              </button>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeubleItem;
