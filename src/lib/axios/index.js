const Axios = require("axios").default;

const axios = Axios.create({
  baseURL: `/api/`,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
  },
});

module.exports = {
  axios,
};
