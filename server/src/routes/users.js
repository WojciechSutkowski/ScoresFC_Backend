const express = require("express");
const {
  usersSignUp,
  usersSignIn,
  userAuth,
  serializeUser,
  checkRole,
} = require("../utils/Auth");

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

module.exports = router;
