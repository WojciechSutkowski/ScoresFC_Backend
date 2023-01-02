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

const getTeamGames = async (teamId, season) => {
  try {
    const games = await axios.get(
      'https://v3.football.api-sports.io/fixtures',
      {
        params: {
          team: teamId,
          season: season,
        },
        headers: {
          'x-rapidapi-key': process.env.API_KEY,
          'x-rapidapi-host': 'v3.football.api-sports.io',
        },
      }
    );
    console.log(games.data.response);
    return games.data.response;
  } catch (err) {
    console.log(err);
  }
};

const getLastFiveGames = async (teamId) => {
  try {
    const games = await axios.get(
      'https://v3.football.api-sports.io/fixtures',
      {
        params: {
          team: teamId,
          last: 5,
        },
        headers: {
          'x-rapidapi-key': process.env.API_KEY,
          'x-rapidapi-host': 'v3.football.api-sports.io',
        },
      }
    );
    console.log(games.data.response);
    return games.data.response;
  } catch (err) {
    console.log(err);
  }
};

const getNextFiveGames = async (teamId) => {
  try {
    const games = await axios.get(
      'https://v3.football.api-sports.io/fixtures',
      {
        params: {
          team: teamId,
          next: 5,
        },
        headers: {
          'x-rapidapi-key': process.env.API_KEY,
          'x-rapidapi-host': 'v3.football.api-sports.io',
        },
      }
    );
    console.log(games.data.response);
    return games.data.response;
  } catch (err) {
    console.log(err);
  }
};

router.get('/:id', async (req, res) => {
  res.send(await getTeamById(req.params.id));
});

router.get('/:id/squad', async (req, res) => {
  res.send(await getTeamSquad(req.params.id));
});

router.get('/:id/games/:season/all', async (req, res) => {
  res.send(await getTeamGames(req.params.id, req.params.season));
});

router.get('/:id/games/last', async (req, res) => {
  res.send(await getLastFiveGames(req.params.id));
});

router.get('/:id/games/next', async (req, res) => {
  res.send(await getNextFiveGames(req.params.id));
});

module.exports = router;
