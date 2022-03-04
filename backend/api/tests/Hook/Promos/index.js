const { default: axios } = require('axios');
const express = require('express');
const app = express();
require('axios');
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

const Promos = async () => {
  app.get('/api/promos', async (request, response) => {
    const r = await axios.get('http://localhost:3001/promos');
    return response.json(r.data);
  })
};

module.exports = Promos;