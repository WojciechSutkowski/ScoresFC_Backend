"use strict";
const path = require("path");
require("dotenv").config({ path: "server/.env" });

const express = require("express");
const axios = require("axios");
const router = express.Router();

/////////////////
const getFixturesByLeagueId = async (leagueId) => {
  try {
    const fixtures = await axios.get(
      "https://v3.football.api-sports.io/fixtures?league",
      {
        params: {
          league: leagueId,
          season: "2022",
        },
        headers: {
          "x-rapidapi-key": process.env.API_KEY,
          "x-rapidapi-host": "v3.football.api-sports.io",
        },
      }
    );
    console.log(fixtures);
    return fixtures.data.response;
  } catch (err) {
    console.log(err);
  }
};

router.get("/:league/:season", async (req, res) => {
  console.log(getFixturesByLeagueId(req.params.league));
  res.send(await getFixturesByLeagueId(req.params.league));
});

module.exports = router;
