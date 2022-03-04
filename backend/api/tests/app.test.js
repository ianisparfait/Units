const users = require('./Hook/Users');
const promos = require('./Hook/Promos');
const commands = require('./Hook/Commands');
const products = require('./Hook/Products');

const TestUsers = {"email": "regular@example.com", "id": 1, "password": "$2a$10$2myKMolZJoH.q.cyXClQXufY1Mc7ETKdSaQQCC6Fgtbe0DCXRBELG"};
const TestPromos = {"code": "FETE", "id": 1, "numberMax": 5, "reduction": "5"};
const TestCommands = {
  "id": 1,
  "user_mail": "test@test.com",
  "user_name": "ianis",
  "type": "card",
  "transaction_id": "tok_1KNvhAKyFYzC5CCaXAhWwwxz",
  "card_id": "card_1KNvhAKyFYzC5CCa0eFh8P2C",
  "country": "France",
  "city": "Aix-en-Provence",
  "zip_code": "13100",
  "adresse": "2 avenue des trucs",
  "amount": "37.38",
  "products": [
    {
      "id": "d680gkfik5gkyyhdxlq",
      "name": "abajour",
      "qty": "1"
    },
    {
      "id": "sla407he9agkyyheaoj",
      "name": "Kallax",
      "qty": "2"
    }
  ]
};
const TestProducts = {
  "id": "yfdv31sgjeikyyhdizq",
  "meubleName": "Lit",
  "meubleStock": "2",
  "meublePrix": "359.56",
  "meubleInfo": "",
  "meubleShortInfo": "Pratique pour dormir",
  "meubleType": ""
};

test('Users API', () => {
  return users().then(data => {
    expect(data).toContainEqual(TestUsers);
  });
});
test('Promos API', () => {
  return promos().then(data => {
    expect(data).toContainEqual(TestPromos);
  });
});
test('Commands API', () => {
  return commands().then(data => {
    expect(data).toContainEqual(TestCommands);
  });
});
test('Products API', () => {
  return products().then(data => {
    expect(data).toContainEqual(TestProducts);
  });
})