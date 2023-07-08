const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  avatar: Number,
  username: String,
  wins: {
    type: Number,
    default: 0,
  },
  losses: {
    type: Number,
    default: 0,
  },
  balance: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Player", playerSchema);
