const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    password: {
      type: String,
      required: true,
    },
    favouriteLeagues: {
      type: [String],
    },
    favouriteGames: {
      type: [String],
    },
    favouriteTeams: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("users", UserSchema);
