const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      maxLength: 6,
    },
    players: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Player",
      },
    ],
    solution: {
      player1: String,
      player2: String,
    },
    guesses: {
      player1: [
        {
          guess: String,
          status: String,
          injured: String,
        },
      ],
      player2: [
        {
          guess: String,
          status: String,
          injured: String,
        },
      ],
    },
    active: {
      type: Boolean,
      default: false,
    },
    turn: {
      type: Number,
      default: 1,
    },
    winner: Number,
    time: {
      type: Number,
      default: 20,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Game", gameSchema);
