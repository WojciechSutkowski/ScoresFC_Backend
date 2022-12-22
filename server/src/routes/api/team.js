'use strict';
const path = require('path');
require('dotenv').config({ path: 'server/.env' });

const express = require('express');
const axios = require('axios');

const router = express.Router();

/////////////////
const getTeamById = async (teamId) => {
  try {
    const team = await axios.get('https://v3.football.api-sports.io/teams', {
      params: {
        id: teamId,
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

const getTeamSquad = async (teamId) => {
  try {
    const squad = await axios.get(
      'https://v3.football.api-sports.io/players/squads',
      {
        params: {
          team: teamId,
        },
        headers: {
          'x-rapidapi-key': process.env.API_KEY,
          'x-rapidapi-host': 'v3.football.api-sports.io',
        },
      }
    );
    console.log(squad.data.response);
    return squad.data.response;
  } catch (err) {
    console.log(err);
  }
};

router.get('/:team', async (req, res) => {
  console.log(getTeamById(req.params.team));
  res.send(await getTeamById(req.params.team));
});

router.get('/squad/:id', async (req, res) => {
  console.log(getTeamSquad(req.params.id));
  res.send(await getTeamSquad(req.params.id));
});

module.exports = router;
