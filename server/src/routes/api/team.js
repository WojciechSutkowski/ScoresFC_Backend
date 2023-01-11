'use strict';
require('dotenv').config({ path: 'server/.env' });
const express = require('express');
const axios = require('axios');

const router = express.Router();

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

const getLeagueTeams = async (leagueId, leagueSeason) => {
  try {
    const teams = await axios.get('https://v3.football.api-sports.io/teams', {
      params: {
        league: leagueId,
        season: leagueSeason,
      },
      headers: {
        'x-rapidapi-key': process.env.API_KEY,
        'x-rapidapi-host': 'v3.football.api-sports.io',
      },
    });
    console.log(teams.data.response);
    return teams.data.response;
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

router.get('/:league/:season/teams', async (req, res) => {
  console.log(req.params);
  const resp = await getLeagueTeams(req.params.league, req.params.season);
  console.log(resp);
  res.send(resp);
});

module.exports = router;
