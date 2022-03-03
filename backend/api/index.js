const express = require('express')
const app = express()
app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Credentials', true);

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

  next();
});

let user = [
  {
    "email": "regular@example.com",
    "password": "$2a$10$2myKMolZJoH.q.cyXClQXufY1Mc7ETKdSaQQCC6Fgtbe0DCXRBELG",
    "id": 1
  },
  {
    "email": "admin@example.com",
    "password": "$2a$10$w8qB40MdYkMs3dgGGf0Pu.xxVOOzWdZ5/Nrkleo3Gqc88PF/OQhOG",
    "id": 2
  }
];

let meubles = [
  {
    "id": "yfdv31sgjeikyyhdizq",
    "meubleName": "Lit",
    "meubleStock": "2",
    "meublePrix": "359.56",
    "meubleInfo": "",
    "meubleShortInfo": "Pratique pour dormir",
    "meubleType": ""
  },
  {
    "id": "d680gkfik5gkyyhdxlq",
    "meubleName": "Abajour",
    "meubleStock": "89",
    "meublePrix": "37.38",
    "meubleInfo": "",
    "meubleShortInfo": "Pratique pour poser des trucs",
    "meubleType": ""
  },
  {
    "id": "sla407he9agkyyheaoj",
    "meubleName": "Kallax",
    "meubleStock": "24",
    "meublePrix": "9.89",
    "meubleInfo": "",
    "meubleShortInfo": "Pratique pour ranger",
    "meubleType": ""
  },
  {
    "id": "o27hlxkkp5kyyhes43",
    "meubleName": "Table basse",
    "meubleStock": "0",
    "meublePrix": "249.25",
    "meubleInfo": "",
    "meubleShortInfo": "Pratique pour devant la télé",
    "meubleType": ""
  },
  {
    "id": "wd96laijjkgkyyhfbxl",
    "meubleName": "Meuble télévision",
    "meubleStock": "8",
    "meublePrix": "49.70",
    "meubleInfo": "",
    "meubleShortInfo": "Pratique pour la télé",
    "meubleType": ""
  },
  {
    "id": "taxy3xeburkyymn5ap",
    "meubleName": "ajoutzoruifh",
    "meubleStock": "15",
    "meublePrix": "12",
    "meubleInfo": "sdfg",
    "meubleShortInfo": "sf",
    "meubleType": "sdf"
  },
  {
    "id": "6vb3t50rgskz7a31kn",
    "meubleName": "marco",
    "meubleStock": "1",
    "meublePrix": "10",
    "meubleInfo": "",
    "meubleShortInfo": "bel homme",
    "meubleType": ""
  }
];

let promos = [
  {
    "id": 1,
    "code": "TEST",
    "numberMax": 5,
    "reduction": "5"
  },
  {
    "id": 2,
    "code": "SECOND",
    "numberMax": 2,
    "reduction": "12"
  }
];

let commandes = [
  {
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
  },
  {
    "id": "euv5857bhzkz46vo5j",
    "user_mail": "admin@example.com",
    "user_name": "Ianis Parfait",
    "type": "card",
    "transaction_id": "tok_1KOMv8KyFYzC5CCaBv9t3XGd",
    "card_id": "card_1KOMv7KyFYzC5CCa6XUC6JQu",
    "country": "France",
    "city": "Aix en provence",
    "zip_code": "13100",
    "adresse": "3 avenue des tamaris",
    "amount": 37.38,
    "products": [
      {
        "id": "d680gkfik5gkyyhdxlq",
        "name": "Abajour",
        "qty": 1
      }
    ]
  },
  {
    "id": "5ocfl9icfltkz47dza6",
    "user_mail": "admin@example.com",
    "user_name": "Ianis Parfait",
    "type": "card",
    "transaction_id": "tok_1KON8uKyFYzC5CCaxMyoST5H",
    "card_id": "card_1KON8uKyFYzC5CCauP7hDWz4",
    "country": "France",
    "city": "Aix en provence",
    "zip_code": "13100",
    "adresse": "3 avenue des tamaris",
    "amount": 61.7,
    "products": [
      {
        "id": "wd96laijjkgkyyhfbxl",
        "name": "Meuble télévision",
        "qty": 1
      },
      {
        "id": "taxy3xeburkyymn5ap",
        "name": "ajoutzoruifh",
        "qty": 1
      }
    ]
  },
  {
    "id": "o7z86xzietrkz79yaca",
    "user_mail": "admin@example.com",
    "user_name": "Ianis Parfait",
    "type": "card",
    "transaction_id": "tok_1KP9S6KyFYzC5CCaofB2hma2",
    "card_id": "card_1KP9S6KyFYzC5CCa4VUYjNPW",
    "country": "France",
    "city": "Aix en provence",
    "zip_code": "13100",
    "adresse": "3 avenue des tamaris",
    "amount": 37.38,
    "products": [
      {
        "id": "d680gkfik5gkyyhdxlq",
        "name": "Abajour",
        "qty": 1
      }
    ]
  }
];

/* Get allDatas */
app.get('/api/users', (request, response) => {
  response.json(user)
})
app.get('/api/meubles', (request, response) => {
  response.json(meubles)
})
app.get('/api/promos', (request, response) => {
  response.json(promos)
})
app.get('/api/commandes', (request, response) => {
  response.json(commandes)
})

/* get specific data */
app.get('/api/users/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = user.find(p => p.id === id)


  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})
app.get('/api/meubles/:id', (request, response) => {
  const id = Number(request.params.id)
  const meuble = meubles.find(p => p.id === id)


  if (meuble) {
    response.json(meuble)
  } else {
    response.status(404).end()
  }
})
app.get('/api/promos/:id', (request, response) => {
  const id = Number(request.params.id)
  const promo = promos.find(p => p.id === id)


  if (promo) {
    response.json(promo)
  } else {
    response.status(404).end()
  }
})
app.get('/api/commandes/:id', (request, response) => {
  const id = Number(request.params.id)
  const commande = commandes.find(p => p.id === id)


  if (commande) {
    response.json(commande)
  } else {
    response.status(404).end()
  }
})

/* login / register */
app.get('/api/login/:email', (request, response) => {
  const e = request.params.email;
  const u = user.find(us => us.email === e);
  if (u) {
    response.json(u)
    response.status(200).send('OK');
  } else {
    response.status(404).end();
  }
});


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})