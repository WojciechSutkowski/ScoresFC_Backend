const User = require("../models/User");

/**
 * @DESC get games from favourites
 */
const getAllFromFavs = async (username, res) => {
  // Check if username is in the database
  const checkUser = await User.findOne({ username });
  console.log(checkUser);
  if (!checkUser) {
    return res.status(404).json({
      message: `Username not found`,
      success: false,
    });
  } else {
    console.log(checkUser.favouriteGames);
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
 * @DESC add league to favourites
 */
const addLeagueToFavs = async (username, leagueId, res) => {
  // Check if username is in the database
  const checkUser = await User.findOne({ username });
  if (!checkUser) {
    return res.status(404).json({
      message: `Username not found`,
      success: false,
    });
  } else {
    checkUser.favouriteLeagues.push(leagueId);
    checkUser.save();
    console.log(checkUser.favouriteLeagues);
    return res.status(200).json({
      message: `Added to favourites correctly`,
      success: true,
    });
  }
};

/**
 * @DESC remove league from favourites
 */
const deleteLeagueFromFavs = async (username, leagueId, res) => {
  // Check if username is in the database
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
    console.log(checkUser.favouriteLeagues);
    return res.status(200).json({
      message: `Removed from favourites correctly`,
      success: true,
    });
  }
};

/**
 * @DESC add game to favourites
 */
const addGameToFavs = async (username, gameId, res) => {
  // Check if username is in the database
  const checkUser = await User.findOne({ username });
  if (!checkUser) {
    return res.status(404).json({
      message: `Username not found`,
      success: false,
    });
  } else {
    checkUser.favouriteGames.push(gameId);
    checkUser.save();
    console.log(checkUser.favouriteGames);
    return res.status(200).json({
      message: `Added to favourites correctly`,
      success: true,
    });
  }
};

/**
 * @DESC remove game from favourites
 */
const deleteGameFromFavs = async (username, gameId, res) => {
  // Check if username is in the database
  const checkUser = await User.findOne({ username });
  if (!checkUser) {
    return res.status(404).json({
      message: `Username not found`,
      success: false,
    });
  } else {
    checkUser.favouriteGames.pull(gameId);
    checkUser.save();
    console.log(checkUser.favouriteGames);
    return res.status(200).json({
      message: `Removed from favourites correctly`,
      success: true,
    });
  }
};

/**
 * @DESC add team to favourites
 */
const addTeamToFavs = async (username, teamId, res) => {
  // Check if username is in the database
  const checkUser = await User.findOne({ username });
  if (!checkUser) {
    return res.status(404).json({
      message: `Username not found`,
      success: false,
    });
  } else {
    checkUser.favouriteTeams.push(teamId);
    checkUser.save();
    console.log(checkUser.favouriteTeams);
    return res.status(200).json({
      message: `Added to favourites correctly`,
      success: true,
    });
  }
};

/**
 * @DESC remove team from favourites
 */
const deleteTeamFromFavs = async (username, teamId, res) => {
  // Check if username is in the database
  const checkUser = await User.findOne({ username });
  if (!checkUser) {
    return res.status(404).json({
      message: `Username not found`,
      success: false,
    });
  } else {
    checkUser.favouriteTeams.pull(teamId);
    checkUser.save();
    console.log(checkUser.favouriteTeams);
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
