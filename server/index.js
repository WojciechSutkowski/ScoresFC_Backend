'use strict';
const cors = require('cors');
const express = require('express');
const bp = require('body-parser');
const { connect } = require('mongoose');
const mongoose = require('mongoose');
const passport = require('passport');
require('dotenv').config();

// APP CONSTANTS
const fixtures = require('./src/routes/api/fixtures');
const league = require('./src/routes/api/league');
const leagues = require('./src/routes/api/leagues');
const team = require('./src/routes/api/team');
const player = require('./src/routes/api/player');
const search = require('./src/routes/api/search');
const users = require('./src/routes/users');
const comments = require('./src/routes/comments');

// INITIALIZE THE APPLICATION
const app = express();

// MIDDLEWARES
app.use(cors());
app.use(bp.json());
app.use(passport.initialize());
require('./src/middlewares/passport')(passport);
app.use('/users', users);
app.use('/comments', comments);
app.use('/league', league);
app.use('/leagues', leagues);
app.use('/fixtures', fixtures);
app.use('/team', team);
app.use('/search', search);
app.use('/player', player);

const startApp = async () => {
  try {
    // MONGO DATABASE CONNECTION
    await connect(process.env.DB, {
      useNewUrlParser: true,
    });
    console.log(`Succesfully connected with the database ${process.env.DB}`);

    // START LISTENING FOR THE SERVER
    if (process.env.NODE_ENV !== 'test') {
      app.listen(process.env.PORT, () =>
        console.log(`Server started on port ${process.env.PORT}`)
      );
    }

    //
    app.use(express.json());

    app.get('/', (req, res) => {
      // root
    });
  } catch (error) {
    console.log(`Unable to connect with database ${error}`);
    startApp();
  }
};

startApp();

module.exports = app;
