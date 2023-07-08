const Player = require("../models/Player");

exports.connectWallet = async (req, res) => {
  try {
    const { address } = req.body;
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
      return res.status(500).json({ success: false, error: "Invalid address" });
    }
    const player = await Player.findOne({ address });

    if (!player) {
      await Player.create({ address });
    }

    return res
      .status(200)
      .json({ success: true, data: !player ? true : false });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

exports.updateUsername = async (req, res) => {
  try {
    const { address, username } = req.body;
    const player = await Player.findOne({ address });

    if (!player) {
      return res
        .status(500)
        .json({ success: false, error: "Kindly connect your wallet" });
    }

    player.username = username;
    player.avatar = Math.floor(Math.random() * 2);
    await player.save();

    return res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

exports.getPlayer = async (req, res) => {
  try {
    const { address } = req.params;
    const player = await Player.findOne({ address });

    if (!player) {
      return res
        .status(500)
        .json({ success: false, error: "Player not found" });
    }

    return res.status(200).json({ success: true, data: player });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, error: err.message });
  }
};
