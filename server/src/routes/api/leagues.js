'use strict';
const path = require('path');
require('dotenv').config({ path: 'server/.env' });

const express = require('express');
const axios = require('axios');

const router = express.Router();

/////////////////
const getLeaguesByCountry = async (countryName) => {
  try {
    const leagues = await axios.get(
      'https://v3.football.api-sports.io/leagues',
      {
        params: {
          country: countryName,
        },
        headers: {
          'x-rapidapi-key': process.env.API_KEY,
          'x-rapidapi-host': 'v3.football.api-sports.io',
        },
      }
    );
    console.log(leagues.data.response);
    return leagues.data.response;
  } catch (err) {
    console.log(err);
  }
};

router.get('/:country', async (req, res) => {
  console.log(getLeaguesByCountry(req.params.country));
  res.send(await getLeaguesByCountry(req.params.country));
});

module.exports = router;
