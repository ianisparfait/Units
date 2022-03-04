import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const Stripe = ({ price, datas }) => {
  const priceForUser = parseFloat(price.toFixed(2));
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51KFEm7KyFYzC5CCaOlJHGhwYLUtIhljpd8Ae45rxmkjAxvcDiVy0dmslxP3bpvOT9haZbLch1Kl6VsHl1TvITxTW00hjU8e98J';
  var result;

  const onToken = token => {
    let object = {
      "id": Math.random().toString(36).substring(2) + Date.now().toString(36),
      "user_mail": token.email,
      "user_name": token.card.name,
      "type": token.type,
      "transaction_id": token.id,
      "card_id": token.card.id,
      "country": token.card.address_country,
      "city": token.card.address_city,
      "zip_code": token.card.address_zip,
      "adresse": token.card.address_line1,
      "amount": priceForUser,
      "products": [],
    }
    let c = datas
    let arrayProducts = []
    for (let x in c) {
      let obj = c[x]
      for (let key in obj) {
        if (typeof obj[key] == "object") {
          var product = {"id": obj[key].id, "name": obj[key].meubleName, "qty": obj.amount}
          arrayProducts.push(product)
        }
      }
    }

    object.products = arrayProducts
    handlePost(object)
  };

  async function handlePost(obj) {
    await axios.post('http://localhost:3001/commandes', obj).then(res => {decrement(result = res)})
  }
  const decrement = async (datas) => {
    let prods = datas.data.products

    for (let index = 0; index < prods.length; index++) {
      const getMeubles = await axios.get('http://localhost:3007/meubles'),
          arrayOfMeubles = getMeubles.data;

      for (let index = 0; index < arrayOfMeubles.length; index++) {
        if (arrayOfMeubles[index] == prods[index].id) {
          arrayOfMeubles[index].amount -= prods[index].qty
        }
      }
    }
  };


  return (
    <StripeCheckout
      label='Payez maintenant avec votre 💳'
      name='ABC inc.'
      billingAddress
      shippingAddress
      image='https://bulma.io/images/placeholders/128x128.png'
      description={`Le montant total est de: ${priceForUser}€`}
      amount={priceForStripe}
      panelLabel='Procéder au paiement'
      token={onToken}
      stripeKey={publishableKey}
      currency='EUR'
      locale='fr'
    />
  )
}

export default Stripe;