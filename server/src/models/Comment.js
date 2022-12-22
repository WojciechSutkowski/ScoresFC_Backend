const { Schema, model } = require('mongoose');

const CommentSchema = new Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    gameId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('comment', CommentSchema);
