const express = require("express");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");
const axiosDefault = require("axios");
const db = require("./db");
const {
  createGame,
  joinGame,
  guessCode,
  checkCode,
  createCode,
  getGame,
} = require("./controllers/gameController");
const {
  connectWallet,
  updateUsername,
} = require("./controllers/playerController");
const io = require("socket.io")(http, {
  cors: {
    origin: ["https://myth-arena.netlify.app", "http://localhost:3000"],
  },
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/api/code", createCode);
app.post("/api/game/:id", getGame);
app.post("/api/check-code", checkCode);
app.post("/api/create", createGame);
app.post("/api/join", joinGame);
app.post("/api/guess", guessCode);
app.post("/api/connect", connectWallet);
app.post("/api/username", updateUsername);

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://mythicals.onrender.com"
    : "http://localhost:8000";
const axios = axiosDefault.create({ baseURL });

io.on("connection", (client) => {
  console.log(`⚡: ${client.id} user just connected!`);
  client.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
  client.on("leave", (room) => {
    client.leave(room);
    console.log(`Client ${client.id} left room ${room}`);
  });

  const handleGuess = (id, guess, address) => {
    axios
      .post("/api/guess", { id, guess, address })
      .then((res) => {
        client.emit("myGuess", res.data.data);
        client.broadcast.emit("opponentGuess", res.data.data);
        if (res.data.data.winner) {
          client.emit("wonGame", res.data.data);
          client.broadcast.emit("lostGame", res.data.data);
        }
      })
      .catch((err) =>
        console.log(err.response?.data.message || err.message || err)
      );
  };

  const handleNewGame = (id, solution, address, time) => {
    axios
      .post("/api/create", { id, solution, address, time })
      .then((res) => {
        client.join(id);
        client.emit("init", 1, id);
      })
      .catch((err) =>
        console.log(err.response?.data.message || err.message || err)
      );
  };

  const handleJoinGame = (id, solution, address) => {
    axios
      .post("/api/join", { id, solution, address })
      .then((res) => {
        client.join(id);
        client.emit("init", 2, id);
        client.broadcast.to(id).emit("joined", res.data.data);
      })
      .catch((err) =>
        console.log(err.response?.data.message || err.message || err)
      );
  };

  client.on("newGame", handleNewGame);
  client.on("joinGame", handleJoinGame);
  client.on("guess", handleGuess);
});

const PORT = process.env.PORT || 8000;
http.listen(PORT, () => {
  db();
  console.log(`Server is listening on port ${PORT}`);
});
