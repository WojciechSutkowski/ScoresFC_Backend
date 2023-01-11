'use strict';
const User = require('../models/User');

/**
 * Get all user favourites
 */
const getAllFromFavs = async (username, res) => {
  const checkUser = await User.findOne({ username });

  if (!checkUser) {
    return res.status(404).json({
      message: `Username not found`,
      success: false,
    });
  } else {
    return res.status(200).json({
      favouriteLeagues: checkUser.favouriteLeagues,
      favouriteGames: checkUser.favouriteGames,
      favouriteTeams: checkUser.favouriteTeams,
      message: `Get from favourites correctly`,
      success: true,
    });
  }
};

/**
 * Add league to favourites
 */
const addLeagueToFavs = async (username, leagueId, res) => {
  const checkUser = await User.findOne({ username });

  if (!checkUser) {
    return res.status(404).json({
      message: `Username not found`,
      success: false,
    });
  } else {
    checkUser.favouriteLeagues.push(leagueId);
    checkUser.save();
    return res.status(200).json({
      message: `Added to favourites correctly`,
      success: true,
    });
  }
};

/**
 * Remove league from favourites
 */
const deleteLeagueFromFavs = async (username, leagueId, res) => {
  const checkUser = await User.findOne({ username });
  console.log(checkUser);
  if (!checkUser) {
    return res.status(404).json({
      message: `Username not found`,
      success: false,
    });
  } else {
    checkUser.favouriteLeagues.pull(leagueId);
    checkUser.save();
    return res.status(200).json({
      message: `Removed from favourites correctly`,
      success: true,
    });
  }
};

/**
 * Add game to favourites
 */
const addGameToFavs = async (username, gameId, res) => {
  const checkUser = await User.findOne({ username });
  if (!checkUser) {
    return res.status(404).json({
      message: `Username not found`,
      success: false,
    });
  } else {
    checkUser.favouriteGames.push(gameId);
    checkUser.save();
    return res.status(200).json({
      message: `Added to favourites correctly`,
      success: true,
    });
  }
};

/**
 * Remove game from favourites
 */
const deleteGameFromFavs = async (username, gameId, res) => {
  const checkUser = await User.findOne({ username });
  if (!checkUser) {
    return res.status(404).json({
      message: `Username not found`,
      success: false,
    });
  } else {
    checkUser.favouriteGames.pull(gameId);
    checkUser.save();
    return res.status(200).json({
      message: `Removed from favourites correctly`,
      success: true,
    });
  }
};

/**
 * Add team to favourites
 */
const addTeamToFavs = async (username, teamId, res) => {
  const checkUser = await User.findOne({ username });
  if (!checkUser) {
    return res.status(404).json({
      message: `Username not found`,
      success: false,
    });
  } else {
    checkUser.favouriteTeams.push(teamId);
    checkUser.save();
    return res.status(200).json({
      message: `Added to favourites correctly`,
      success: true,
    });
  }
};

/**
 * Remove team from favourites
 */
const deleteTeamFromFavs = async (username, teamId, res) => {
  const checkUser = await User.findOne({ username });
  if (!checkUser) {
    return res.status(404).json({
      message: `Username not found`,
      success: false,
    });
  } else {
    checkUser.favouriteTeams.pull(teamId);
    checkUser.save();
    return res.status(200).json({
      message: `Removed from favourites correctly`,
      success: true,
    });
  }
};

module.exports = {
  getAllFromFavs,
  addLeagueToFavs,
  deleteLeagueFromFavs,
  addGameToFavs,
  deleteGameFromFavs,
  addTeamToFavs,
  deleteTeamFromFavs,
};
