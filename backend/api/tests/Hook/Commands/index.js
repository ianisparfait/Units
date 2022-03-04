const { default: axios } = require("axios");

const Commands = async () => {
  const res = await axios.get('http://localhost:3007/api/commandes');
  return res.data;
};

module.exports = Commands;