'use strict';
const path = require('path');
require('dotenv').config({ path: 'server/.env' });

const express = require('express');
const axios = require('axios');
const router = express.Router();

/////////////////
const getFixturesByLeagueId = async (leagueId, season) => {
  try {
    const fixtures = await axios.get(
      'https://v3.football.api-sports.io/fixtures',
      {
        params: {
          league: leagueId,
          season: season,
        },
        headers: {
          'x-rapidapi-key': process.env.API_KEY,
          'x-rapidapi-host': 'v3.football.api-sports.io',
        },
      }
    );
    console.log(fixtures);
    return fixtures.data.response;
  } catch (err) {
    console.log(err);
  }
};

const getFixtureById = async (gameId) => {
  try {
    const match = await axios.get(
      'https://v3.football.api-sports.io/fixtures',
      {
        params: {
          id: gameId,
        },
        headers: {
          'x-rapidapi-key': process.env.API_KEY,
          'x-rapidapi-host': 'v3.football.api-sports.io',
        },
      }
    );
    console.log(match);
    return match.data.response;
  } catch (err) {
    console.log(err);
  }
};

router.get('/:league/:season', async (req, res) => {
  console.log(getFixturesByLeagueId(req.params.league));
  res.send(await getFixturesByLeagueId(req.params.league));
});

router.get('/:id', async (req, res) => {
  console.log(getFixtureById(req.params.id));
  res.send(await getFixtureById(req.params.id));
});

module.exports = router;
