'use strict';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../models/User');

/**
 * Register any type of user
 */
const usersRegister = async (userDetails, role, res) => {
  try {
    let usernameTaken = await validateUsername(userDetails.username);
    if (!usernameTaken) {
      return res.status(400).json({
        message: `This username is already taken`,
        success: false,
      });
    }

    let emailTaken = await validateEmail(userDetails.email);
    if (!emailTaken) {
      return res.status(400).json({
        message: `This email is already taken`,
        success: false,
      });
    }

    if (userDetails.password === '') {
      return res.status(400).json({
        message: `Password cannot be empty`,
        success: false,
      });
    }

    const password = await bcrypt.hash(userDetails.password, 12);

    const newUser = new User({
      ...userDetails,
      password,
      role,
    });
    await newUser.save();
    return res.status(201).json({
      message: `Registered correctly`,
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: `Unable to create account`,
      success: false,
    });
  }
};

/**
 * Login any type of user
 */
const usersLogin = async (userCredentials, role, res) => {
  let { username, password } = userCredentials;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).json({
      message: `Username not found`,
      success: false,
    });
  }

  if (user.role !== role) {
    return res.status(403).json({
      message: `You try to access wrong content`,
      success: false,
    });
  }

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
      { expiresIn: '7 days' }
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
      message: `Logged in correctly`,
      success: true,
    });
  } else {
    return res.status(403).json({
      message: `Wrong password`,
      success: false,
    });
  }
};

const deleteUser = async (username, res) => {
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        message: `Username not found`,
        success: false,
      });
    }

    await User.collection.deleteOne({ username: username });

    return res.status(200).json({
      message: `Deleted correctly`,
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: `Unable to delete account`,
      success: false,
    });
  }
};

const userAuth = passport.authenticate('jwt', { session: false });

const checkRole = (roles) => (req, res, next) =>
  !roles.includes(req.user.role)
    ? res.status(401).json('Unauthorized')
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
  usersRegister,
  usersLogin,
  userAuth,
  serializeUser,
  checkRole,
  deleteUser,
};
