"use strict";
const path = require("path");
require("dotenv").config({ path: "server/.env" });

const express = require("express");
const axios = require("axios");

const router = express.Router();

/////////////////
const getLeagueById = async (leagueId) => {
  try {
    const league = await axios.get(
      "https://v3.football.api-sports.io/leagues?id",
      {
        params: {
          id: leagueId,
        },
        headers: {
          "x-rapidapi-key": process.env.API_KEY,
          "x-rapidapi-host": "v3.football.api-sports.io",
        },
      }
    );
    console.log(league.data.response);
    return league.data.response;
  } catch (err) {
    console.log(err);
  }
};

const getLeagueSeason = async (leagueId, leagueSeason) => {
  try {
    const season = await axios.get(
      "https://v3.football.api-sports.io/leagues",
      {
        params: {
          id: leagueId,
          season: leagueSeason,
        },
        headers: {
          "x-rapidapi-key": process.env.API_KEY,
          "x-rapidapi-host": "v3.football.api-sports.io",
        },
      }
    );
    console.log(season.data.response);
    return season.data.response;
  } catch (err) {
    console.log(err);
  }
};

router.get("/:id", async (req, res) => {
  console.log(getLeagueById(req.params.id));
  res.send(await getLeagueById(req.params.id));
});

router.get("/:id/:season", async (req, res) => {
  console.log(getLeagueSeason(req.params.id, req.params.season));
  res.send(await getLeagueSeason(req.params.id, req.params.season));
});

module.exports = router;
