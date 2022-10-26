"use strict";
const express = require("express");
const app = express();

const port = process.env.PORT || 5000;
const stadiums = require("./routes/api/stadiums");

app.use(express.json());
app.use("/venues", stadiums);

app.get("/", (req, res) => {
  // root
});

app.listen(port, () => console.log(`Server started on port ${port}`));
