"use strict";
const cors = require("cors");
const express = require("express");
const bp = require("body-parser");
const { connect } = require("mongoose");
const mongoose = require("mongoose");
const passport = require("passport");
require("dotenv").config();

// APP CONSTANTS
const venue = require("./src/routes/api/venue");
const fixtures = require("./src/routes/api/fixtures");
const users = require("./src/routes/users");

// INITIALIZE THE APPLICATION
const app = express();

// MIDDLEWARES
app.use(cors());
app.use(bp.json());
app.use(passport.initialize());
require("./src/middlewares/passport")(passport);
app.use("/users", users);

const startApp = async () => {
  try {
    // MONGO DATABASE CONNECTION
    await connect(process.env.DB, {
      useNewUrlParser: true,
    });
    console.log(`Succesfully connected with the database ${process.env.DB}`);

    // START LISTENING FOR THE SERVER
    app.listen(process.env.PORT, () =>
      console.log(`Server started on port ${process.env.PORT}`)
    );

    //
    app.use(express.json());

    app.use("/venue", venue);
    app.use("/fixtures", fixtures);

    app.get("/", (req, res) => {
      // root
    });
  } catch (error) {
    console.log(`Unable to connect with database ${error}`);
    startApp();
  }
};

startApp();
