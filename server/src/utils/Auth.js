const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
require("dotenv").config();

const User = require("../models/User");

/**
 * @DESC sign up any type of user
 */
const usersSignUp = async (userDetails, role, res) => {
  try {
    // Validate username
    let usernameTaken = await validateUsername(userDetails.username);
    if (!usernameTaken) {
      return res.status(400).json({
        message: `This username is already taken`,
        success: false,
      });
    }

    // Validate email
    let emailTaken = await validateEmail(userDetails.email);
    if (!emailTaken) {
      return res.status(400).json({
        message: `This email is already taken`,
        success: false,
      });
    }

    // Get hashed password
    const password = await bcrypt.hash(userDetails.password, 12);

    // Create new user
    const newUser = new User({
      ...userDetails,
      password,
      role,
    });
    await newUser.save();
    return res.status(201).json({
      message: `Signed up correctly`,
      success: true,
    });
  } catch (err) {
    console.log(err);
    // Logger
    return res.status(500).json({
      message: `Unable to create account`,
      success: false,
    });
  }
};

/**
 * @DESC sign in any type of user
 */
const usersSignIn = async (userCredentials, role, res) => {
  let { username, password } = userCredentials;

  // Check if username is in the database
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({
      message: `Username not found`,
      success: false,
    });
  }

  // User role check
  if (user.role !== role) {
    return res.status(403).json({
      message: `You try to access wrong content`,
      success: false,
    });
  }

  // Password check
  let isPasswordMatching = await bcrypt.compare(password, user.password);
  if (isPasswordMatching) {
    let token = jwt.sign(
      {
        user_id: user._id,
        role: user.role,
        user: user.username,
        email: user.email,
      },
      process.env.SECRET,
      { expiresIn: "7 days" }
    );

    let result = {
      username: user.username,
      role: user.role,
      email: user.email,
      favouriteLeagues: user.favouriteLeagues,
      favouriteGames: user.favouriteGames,
      favouriteTeams: user.favouriteTeams,
      token: `Bearer ${token}`,
      expiresIn: 168,
    };

    return res.status(200).json({
      ...result,
      message: `Signed in correctly`,
      success: true,
    });
  } else {
    return res.status(403).json({
      message: `Wrong password`,
      success: false,
    });
  }
};

/**
 * @DESC passport middleware
 */
const userAuth = passport.authenticate("jwt", { session: false });

/**
 * @DESC check middleware
 */
const checkRole = (roles) => (req, res, next) =>
  !roles.includes(req.user.role)
    ? res.status(401).json("Unauthorized")
    : next();

const validateUsername = async (username) => {
  let user = await User.findOne({ username });
  return user ? false : true;
};

const validateEmail = async (email) => {
  let user = await User.findOne({ email });
  return user ? false : true;
};

const serializeUser = (user) => {
  return {
    _id: user._id,
    firstname: user.firstname,
    lastname: user.lastname,
    username: user.username,
    email: user.email,
    updatedAt: user.updatedAt,
    createdAt: user.createdAt,
  };
};

module.exports = {
  usersSignUp,
  usersSignIn,
  userAuth,
  serializeUser,
  checkRole,
};
