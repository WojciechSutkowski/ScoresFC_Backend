'use strict';
const path = require('path');
require('dotenv').config({ path: 'server/.env' });

const express = require('express');
const axios = require('axios');

const router = express.Router();

/////////////////
const getLeagueByCountry = async (countryName, leagueName) => {
  try {
    const leagues = await axios.get(
      'https://v3.football.api-sports.io/leagues',
      {
        params: {
          country: countryName,
          name: leagueName,
          current: true,
        },
        headers: {
          'x-rapidapi-key': process.env.API_KEY,
          'x-rapidapi-host': 'v3.football.api-sports.io',
        },
      }
    );
    // console.log(leagues);
    // console.log(leagueName);
    // console.log(leagues.data.response);
    return leagues.data.response;
  } catch (err) {
    console.log(err);
  }
};

const getLeagueSeason = async (leagueId, leagueSeason) => {
  try {
    const season = await axios.get(
      'https://v3.football.api-sports.io/leagues',
      {
        params: {
          id: leagueId,
          season: leagueSeason,
        },
        headers: {
          'x-rapidapi-key': process.env.API_KEY,
          'x-rapidapi-host': 'v3.football.api-sports.io',
        },
      }
    );
    console.log(season.data.response);
    return season.data.response;
  } catch (err) {
    console.log(err);
  }
};

router.get('/:country/:name', async (req, res) => {
  console.log('start');
  const resp = await getLeagueByCountry(req.params.country, req.params.name);
  console.log(resp);
  res.send(resp);
});

router.get('/:id/:season', async (req, res) => {
  console.log(getLeagueSeason(req.params.id, req.params.season));
  res.send(await getLeagueSeason(req.params.id, req.params.season));
});

module.exports = router;
