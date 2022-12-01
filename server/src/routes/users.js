const express = require("express");
const {
  usersSignUp,
  usersSignIn,
  userAuth,
  serializeUser,
  checkRole,
} = require("../utils/Auth");

const {
  getAllFromFavs,
  addLeagueToFavs,
  deleteLeagueFromFavs,
  addGameToFavs,
  deleteGameFromFavs,
  addTeamToFavs,
  deleteTeamFromFavs,
} = require("../utils/Favourites");

const router = express.Router();

// USER SIGN UP ROUTE
router.post("/signup-user", async (req, res) => {
  await usersSignUp(req.body, "user", res);
  console.log(res.req.body);
});

// ADMIN SIGN UP ROUTE
router.post("/signup-admin", async (req, res) => {
  await usersSignUp(req.body, "admin", res);
});

// USER SIGN IN ROUTE
router.post("/signin-user", async (req, res) => {
  await usersSignIn(req.body, "user", res);
  console.log(res.req.body);
});

// ADMIN SIGN IN ROUTE
router.post("/signin-admin", async (req, res) => {
  await usersSignIn(req.body, "admin", res);
});

// USER PROTECTED ROUTE
router.get("/profile", userAuth, async (req, res) => {
  return res.json(serializeUser(req.user));
});

// USER PROTECTED ROUTE
router.get(
  "/user-profile",
  userAuth,
  checkRole(["user", "admin"]),
  async (req, res) => {
    return res.json(serializeUser(req.user));
  }
);

// ADMIN PROTECTED ROUTE
router.get(
  "/admin-profile",
  userAuth,
  checkRole(["admin"]),
  async (req, res) => {
    return res.json(serializeUser(req.user));
  }
);

// FAVOURITES
router.get("/favourites", async (req, res) => {
  return await getAllFromFavs(req.query.username, res);
});

router.post("/favourite-leagues", async (req, res) => {
  await addLeagueToFavs(req.body.username, req.body.leagueId, res);
  console.log(res.req.body);
});

router.delete("/favourite-leagues", async (req, res) => {
  await deleteLeagueFromFavs(req.query.username, req.query.leagueId, res);
  console.log(res.req.body);
});

router.post("/favourite-games", async (req, res) => {
  await addGameToFavs(req.body.username, req.body.gameId, res);
  console.log(res.req.body);
});

router.delete("/favourite-games", async (req, res) => {
  await deleteGameFromFavs(req.query.username, req.query.gameId, res);
  console.log(res.req.body);
});

router.post("/favourite-teams", async (req, res) => {
  await addTeamToFavs(req.body.username, req.body.teamId, res);
  console.log(res.req.body);
});

router.delete("/favourite-teams", async (req, res) => {
  await deleteTeamFromFavs(req.query.username, req.query.teamId, res);
  console.log(res.req.body);
});

module.exports = router;
