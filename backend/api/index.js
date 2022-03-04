const { default: axios } = require('axios');
const express = require('express');
const app = express();
require('axios');
const flatted = require('flatted');
app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Credentials', true);

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

  next();
});

/* Get allDatas */
app.get('/api/users', async (request, response) => {
  const u = await axios.get('http://localhost:3001/users');
  response.json(u.data);
})
app.get('/api/meubles', async (request, response) => {
  const m = await axios.get('http://localhost:3001/meubles');
  response.json(m.data);
})
app.get('/api/promos', async (request, response) => {
  const p = await axios.get('http://localhost:3001/promos');
  response.json(p.data);
})
app.get('/api/commandes', async (request, response) => {
  const c = await axios.get('http://localhost:3001/commandes');
  response.json(c.data)
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
});

const PORT = 3007;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})