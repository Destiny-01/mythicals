const Game = require("../models/Game");
const Player = require("../models/Player");
const { getStatus } = require("../utils");

const createCode = async (req, res) => {
  try {
    const { address } = req.body;

    const player = await Player.findOne({ address });
    if (!player) {
      return res
        .status(500)
        .json({ success: false, message: "Kindly connect your wallet" });
    }
    let id = "";
    const characters = "01234567890";
    while (id.length < 5) {
      id += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    await Game.create({ id, players: [player._id] });
    return res.status(200).json({ success: true, data: id });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

const checkCode = async (req, res) => {
  try {
    const { address, code } = req.body;

    const player = await Player.findOne({ address });
    if (!player) {
      return res
        .status(500)
        .json({ success: false, message: "Kindly connect your wallet" });
    }

    const game = await Game.findOne({ id: code }).populate("players");
    if (!game || game.players.length !== 1) {
      return res
        .status(500)
        .json({ success: false, message: "Invalid game code" });
    }

    game.players.push(player._id);
    await game.save();

    return res.status(200).json({
      success: true,
      data: { player1: game.players[0], player2: player },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

const createGame = async (req, res) => {
  try {
    const { id, solution, address, time } = req.body;

    const player = await Player.findOne({ address });
    if (!player) {
      return res
        .status(500)
        .json({ success: false, message: "Kindly connect your wallet" });
    }

    const game = await Game.findOne({ id });

    if (!game.players.includes(player._id)) {
      return res
        .status(500)
        .json({ success: false, message: "Game code expired or invalid" });
    }

    game.solution.player1 = solution;
    game.time = time;
    await game.save();
    return res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

const joinGame = async (req, res) => {
  try {
    const { id, solution, address } = req.body;

    const player = await Player.findOne({ address });
    if (!player) {
      return res
        .status(500)
        .json({ success: false, message: "Kindly connect your wallet" });
    }

    const game = await Game.findOneAndUpdate(
      { id },
      {
        "solution.player2": solution,
        active: true,
      },
      { new: true }
    ).populate("players");
    return res.status(200).json({ success: true, data: game.players });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

const guessCode = async (req, res) => {
  try {
    const { id, guess, address } = req.body;

    const player = await Player.findOne({ address });
    if (!player) {
      return res
        .status(500)
        .json({ success: false, message: "Kindly connect your wallet" });
    }

    const game = await Game.findOne({ id });
    if (!game) {
      return res
        .status(500)
        .json({ success: false, message: "Game not found" });
    }

    if (game.turn !== game.players.findIndex((x) => x.equals(player._id)) + 1) {
      return res
        .status(500)
        .json({ success: false, message: "Not your turn to guess" });
    }
    const { injured, status } =
      game.turn === 1
        ? getStatus(guess, game.solution.player2)
        : getStatus(guess, game.solution.player1);
    if (status === "dead dead dead dead dead") {
      game.winner = game.turn;
      game.active = false;
      player.wins++;
      await Player.findByIdAndUpdate(
        game.players.find((x) => x !== player._id),
        { $inc: { losses: 1 } }
      );
      await player.save();
    }

    if (game.turn === 1) {
      game.guesses.player1.push({ guess, status, injured });
      game.turn = 2;
    } else {
      game.guesses.player2.push({ guess, status, injured });
      game.turn = 1;
    }

    await game.save();
    return res.status(200).json({ success: true, data: game });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

const getGame = async (req, res) => {
  try {
    const { id, address } = req.query;

    const game = await Game.findOne({ id }).populate("players");
    if (!game) {
      return res
        .status(500)
        .json({ success: false, message: "Game not found" });
    }

    const player = await Player.findOne({ address });
    console.log(game, player);
    const playerNumber = game.players[0]._id.equals(player._id)
      ? 1
      : game.players[1]._id.equals(player._id)
      ? 2
      : 0;

    if ((!game.active && game.players.length === 1) || game.active) {
      if (playerNumber === 1) {
        game.solution.player2 = undefined;
      } else if (playerNumber === 2) {
        game.solution.player1 = undefined;
      } else {
        game.solution = undefined;
      }
    }

    return res
      .status(200)
      .json({ success: true, data: game, player: playerNumber });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  createGame,
  getGame,
  joinGame,
  guessCode,
  checkCode,
  createCode,
};
