const User = require('../models/User');
const Comment = require('../models/Comment');
const { ObjectId } = require('mongodb');

/**
 * @DESC get games from favourites
 */
const getAllComments = async (res) => {
  try {
    // Check if username is in the database
    const allComments = await Comment.find();
    console.log(allComments);

    return res.status(200).json({
      allComments,
      message: `Get all comments correctly`,
      success: true,
    });
  } catch (err) {
    console.log(err);
    // Logger
    return res.status(500).json({
      message: `Unable to get comments`,
      success: false,
    });
  }
};

/**
 * @DESC get games from favourites
 */
const getGameComments = async (gameId, res) => {
  try {
    // Check if username is in the database
    const allComments = await Comment.find({ gameId: gameId });
    console.log(allComments);

    return res.status(200).json({
      allComments,
      message: `Get all comments correctly`,
      success: true,
    });
  } catch (err) {
    console.log(err);
    // Logger
    return res.status(500).json({
      message: `Unable to get comments`,
      success: false,
    });
  }
};

/**
 * @DESC add league to favourites
 */
const addComment = async (username, gameId, comment, res) => {
  try {
    const newComment = new Comment({
      comment,
      username,
      gameId,
    });

    await newComment.save();
    return res.status(200).json({
      message: `Comment added correctly`,
      success: true,
    });
  } catch (err) {
    console.log(err);
    // Logger
    return res.status(500).json({
      message: `Unable to create comment`,
      success: false,
    });
  }
};

/**
 * @DESC remove game from favourites
 */
const deleteComment = async (username, role, commentId, res) => {
  // Check if username is in the database
  const checkUser = await User.findOne({ username });
  const checkComment = await Comment.findById(ObjectId(commentId));

  // User role check
  if (checkUser.role !== role) {
    return res.status(403).json({
      message: `You try to access wrong content`,
      success: false,
    });
  }

  if (!checkComment) {
    return res.status(404).json({
      message: `Comment not found`,
      success: false,
    });
  } else {
    checkComment.deleteOne(checkComment);
    return res.status(200).json({
      message: `Comment removed correctly`,
      success: true,
    });
  }
};

module.exports = {
  getAllComments,
  getGameComments,
  addComment,
  deleteComment,
};
