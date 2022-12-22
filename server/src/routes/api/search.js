'use strict';
const path = require('path');
require('dotenv').config({ path: 'server/.env' });

const express = require('express');
const axios = require('axios');

const router = express.Router();

/////////////////
const getTeamByName = async (teamName) => {
  try {
    const team = await axios.get('https://v3.football.api-sports.io/teams', {
      params: {
        search: teamName,
      },
      headers: {
        'x-rapidapi-key': process.env.API_KEY,
        'x-rapidapi-host': 'v3.football.api-sports.io',
      },
    });
    console.log(team.data.response);
    return team.data.response;
  } catch (err) {
    console.log(err);
  }
};

const getLeagueByName = async (leagueName) => {
  try {
    const league = await axios.get(
      'https://v3.football.api-sports.io/leagues',
      {
        params: {
          search: leagueName,
        },
        headers: {
          'x-rapidapi-key': process.env.API_KEY,
          'x-rapidapi-host': 'v3.football.api-sports.io',
        },
      }
    );
    console.log(league.data.response);
    return league.data.response;
  } catch (err) {
    console.log(err);
  }
};

router.get('/team/:search', async (req, res) => {
  console.log(getTeamByName(req.params.search));
  res.send(await getTeamByName(req.params.search));
});

router.get('/league/:search', async (req, res) => {
  console.log(getLeagueByName(req.params.search));
  res.send(await getLeagueByName(req.params.search));
});

module.exports = router;
