const { default: axios } = require("axios");

const Products = async () => {
  const res = await axios.get('http://localhost:3007/api/meubles');
  return res.data;
}

module.exports = Products;