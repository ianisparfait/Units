const { default: axios } = require("axios");

const Promos = async () => {
  const res = await axios.get('http://localhost:3007/api/promos');
  return res.data;
};

module.exports = Promos;