"use strict";
const express = require("express");
const axios = require("axios");

const router = express.Router();

/////////////////
const config = {
  method: "get",
  url: "https://v3.football.api-sports.io/venues?id",
  params: {
    id: "555",
  },
  headers: {
    "x-rapidapi-key": "ecc8e0a784e36be844e86fa2e67b8f01",
    "x-rapidapi-host": "v3.football.api-sports.io",
  },
};

axios(config)
  .then(function (response) {
    console.log(response.data);
    router.route("/").get((req, res) => {
      res.send(response.data);
    });
  })
  .catch(function (error) {
    console.log(error);
  });

module.exports = router;
