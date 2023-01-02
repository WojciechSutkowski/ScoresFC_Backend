'use strict';
const path = require('path');
require('dotenv').config({ path: 'server/.env' });

const express = require('express');
const axios = require('axios');
const router = express.Router();

/////////////////
const getFixturesByLeagueId = async (leagueId, season, status) => {
  try {
    const fixtures = await axios.get(
      'https://v3.football.api-sports.io/fixtures',
      {
        params: {
          league: leagueId,
          season: season,
          status: status,
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

router.get('/:league/:season/not-started', async (req, res) => {
  res.send(
    await getFixturesByLeagueId(
      req.params.league,
      req.params.season,
      'TBD-NS-PST-CANC-ABD'
    )
  );
});

router.get('/:league/:season/live', async (req, res) => {
  res.send(
    await getFixturesByLeagueId(
      req.params.league,
      req.params.season,
      '1H-HT-2H-ET-BT-P-SUSP-INT-LIVE'
    )
  );
});

router.get('/:league/:season/finished', async (req, res) => {
  res.send(
    await getFixturesByLeagueId(
      req.params.league,
      req.params.season,
      'FT-AET-PEN-WO-AWD'
    )
  );
});

router.get('/:id', async (req, res) => {
  console.log(getFixtureById(req.params.id));
  res.send(await getFixtureById(req.params.id));
});

module.exports = router;
