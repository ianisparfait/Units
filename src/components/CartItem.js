import React from "react";

const CartItem = props => {
  const { cartItem, cartKey } = props;

  const { meuble, amount } = cartItem;

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
            <span className="has-text-primary">{amount < 2 ? (`${amount} article dans le panier`) : (`${amount} articles dans le panier`)}</span>
          </div>
          <div
            className="media-right"
            onClick={() => props.removeFromCart(cartKey)}
          >
            <span className="delete is-large"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
