"use strict";
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 5000;

/////////////
// ROUTES //
////////////
const venue = require("./src/routes/api/venue");
const fixtures = require("./src/routes/api/fixtures");

///////////////////////////////
// MONGO DATABASE CONNECTION //
///////////////////////////////
mongoose.connect("mongodb://localhost:27017", (err) => {
  if (!err) console.log("MongoDB connected correctly!");
  else console.log("MongoDB error!");
});

app.use(express.json());

app.use("/venue", venue);
app.use("/fixtures", fixtures);

/////////////
// WIDGETS //
/////////////
// app.get("/games", (req, res) => {
//   res.sendFile(
//     path.join(__dirname, "/src/templates", "matches_list_widget.html")
//   );
// });

// app.get("/match", (req, res) => {
//   res.sendFile(
//     path.join(__dirname, "/src/templates", "matche_details_widget.html")
//   );
// });

// app.get("/standings", (req, res) => {
//   res.sendFile(
//     path.join(__dirname, "/src/templates", "league_table_widget.html")
//   );
// });

app.get("/", (req, res) => {
  // root
});

app.listen(port, () => console.log(`Server started on port ${port}`));
