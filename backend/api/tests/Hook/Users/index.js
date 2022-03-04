const { default: axios } = require("axios");

const Users = async () => {
  const res = await axios.get('http://localhost:3007/api/users');
  return res.data;
};

module.exports = Users;