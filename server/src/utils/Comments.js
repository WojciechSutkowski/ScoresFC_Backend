'use strict';
const { ObjectId } = require('mongodb');

const Comment = require('../models/Comment');

/**
 * Get games from favourites
 */
const getAllComments = async (res) => {
  try {
    const allComments = await Comment.find();

    return res.status(200).json({
      allComments,
      message: `Get all comments correctly`,
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: `Unable to get comments`,
      success: false,
    });
  }
};

/**
 * Get games from favourites
 */
const getGameComments = async (gameId, res) => {
  try {
    const gameComments = await Comment.find({ gameId: gameId });

    return res.status(200).json({
      gameComments,
      message: `Get all comments correctly`,
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: `Unable to get comments`,
      success: false,
    });
  }
};

/**
 * Add league to favourites
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

    return res.status(500).json({
      message: `Unable to create comment`,
      success: false,
    });
  }
};

/**
 * Remove game from favourites
 */
const deleteComment = async (commentId, res) => {
  const checkComment = await Comment.findById(ObjectId(commentId));

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
