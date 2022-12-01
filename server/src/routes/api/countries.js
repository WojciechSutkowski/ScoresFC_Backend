"use strict";
const path = require("path");
require("dotenv").config({ path: "server/.env" });

const express = require("express");
const axios = require("axios");

const router = express.Router();

/////////////////
const getCountryByName = async (countryName) => {
  try {
    const venue = await axios.get(
      "https://v3.football.api-sports.io/venues?id",
      {
        params: {
          id: venueId,
        },
        headers: {
          "x-rapidapi-key": process.env.API_KEY,
          "x-rapidapi-host": "v3.football.api-sports.io",
        },
      }
    );
    console.log(venue.data.response);
    return venue.data.response;
  } catch (err) {
    console.log(err);
  }
};

router.get("/:id", async (req, res) => {
  console.log(getCountryById(req.params.id));
  res.send(await getCountryById(req.params.id));
});

module.exports = router;
