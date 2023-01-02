'use strict';
const path = require('path');
require('dotenv').config({ path: 'server/.env' });

const express = require('express');
const axios = require('axios');
const router = express.Router();

/////////////////
const getPlayerBySeason = async (playerId, season) => {
  try {
    const player = await axios.get(
      'https://v3.football.api-sports.io/players',
      {
        params: {
          id: playerId,
          season: season,
        },
        headers: {
          'x-rapidapi-key': process.env.API_KEY,
          'x-rapidapi-host': 'v3.football.api-sports.io',
        },
      }
    );
    console.log(player);
    return player.data.response;
  } catch (err) {
    console.log(err);
  }
};

router.get('/:id/:season', async (req, res) => {
  res.send(await getPlayerBySeason(req.params.id, req.params.season));
});

module.exports = router;
