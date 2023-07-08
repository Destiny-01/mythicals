import { useState, useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import NavbarWrapper from "../components/NavbarWrapper";
import Keyboard from "../components/keyboard/Keyboard";
import { Grid } from "../components/grid/Grid";
import { useParams } from "react-router-dom";
import WinGame from "../components/modals/WinGame";
import LoseGame from "../components/modals/LoseGame";
import axios from "../config/axios";
import Timer from "../components/Timer";
import { usePlayerContext } from "../context/PlayerContext";
import { wonGame } from "../utils/contract";
import { randomNumbers } from "../utils";
import ConfirmModal from "../components/modals/ConfirmModal";

export default function Arena({ socket }) {
  const [currentGuess, setCurrentGuess] = useState("");
  const [solution, setSolution] = useState("");
  const [key, setKey] = useState(0);
  const [players, setPlayers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const [isGameLost, setIsGameLost] = useState(false);
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [turn, setTurn] = useState(false);
  const [oppSol, setOppSol] = useState("");
  const [myGuesses, setMyGuesses] = useState([]);
  const [opponentGuesses, setOpponentGuesses] = useState([]);
  const [myStatus, setMyStatus] = useState([]);
  const [opponentStatus, setOpponentStatus] = useState([]);
  const [myInjuredStatus, setMyInjuredStatus] = useState([]);
  const [opponentInjuredStatus, setOpponentInjuredStatus] = useState([]);
  const { id } = useParams();
  const { address } = usePlayerContext();

  useEffect(() => {
    socket.on("myGuess", (game) => {
      if (game.id === id) {
        if (game.turn === 2) {
          setMyGuesses(game.guesses.player1.map((x) => x.guess));
          setMyStatus(game.guesses.player1.map((x) => x.status));
          setMyInjuredStatus(game.guesses.player1.map((x) => x.injured));
        } else if (game.turn === 1) {
          setMyGuesses(game.guesses.player2.map((x) => x.guess));
          setMyStatus(game.guesses.player2.map((x) => x.status));
          setMyInjuredStatus(game.guesses.player2.map((x) => x.injured));
        }
        setTurn(false);
      }
    });

    socket.on("opponentGuess", (game) => {
      if (game.id === id) {
        if (game.turn === 1) {
          setOpponentGuesses(game.guesses.player2.map((x) => x.guess));
          setOpponentStatus(game.guesses.player2.map((x) => x.status));
          setOpponentInjuredStatus(game.guesses.player2.map((x) => x.injured));
        } else if (game.turn === 2) {
          setOpponentGuesses(game.guesses.player1.map((x) => x.guess));
          setOpponentStatus(game.guesses.player1.map((x) => x.status));
          setOpponentInjuredStatus(game.guesses.player1.map((x) => x.injured));
        }
        setTurn(true);
        setIsPlaying(true);
      }
    });

    socket.on("wonGame", (game) => {
      if (game.id === id) {
        setIsGameWon(true);
        setIsGameEnded(true);
        if (game.winner === 1) {
          setOppSol(game.solution.player2);
        } else if (game.winner === 2) {
          setOppSol(game.solution.player1);
        }
      }
    });

    socket.on("lostGame", (game) => {
      if (game.id === id) {
        setIsGameLost(true);
        setIsGameEnded(true);
        if (game.turn === 1) {
          setOppSol(game.solution.player2);
        } else if (game.turn === 2) {
          setOppSol(game.solution.player1);
        }
      }
    });

    socket.on("joinedGame", (players) => {
      setIsGameStarted(true);
      setPlayers(players);
    });
  }, [id, socket]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/game?id=${id}&address=${address}`);
        console.log(res);

        if (res.data.data) {
          const game = res.data.data;
          const returnedPlayer = res.data.player;

          setPlayers(game.players);
          setTurn(game.turn === returnedPlayer);
          setDuration(game.time);
          game.active && game.players.length > 1 && setIsGameStarted(true);

          if (!game.active && game.winner && returnedPlayer) {
            game.winner === returnedPlayer
              ? setIsGameWon(true)
              : setIsGameLost(true);
            setIsGameEnded(true);
          }

          if (
            (!game.active && game.players[0].address === address) ||
            game.active
          ) {
            setSolution(game.solution.player1 || game.solution.player2);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [address, id]);

  const onComplete = (t) => {
    if (t === duration && !isGameEnded) {
      onEnter(randomNumbers(5));
    }
  };

  const handleWonGame = async () => {
    if (!isGameWon && !isGameEnded) {
      return alert("Game in progress");
    }
    setIsOpen(true);

    const eggs = randomNumbers(5).split("").map(Number);
    const data = {
      player1: players[0].address,
      player2: players[1].address,
      solution1: players[0].address === address ? solution : oppSol,
      solution2: players[0].address !== address ? solution : oppSol,
      guesses1: players[0].address === address ? myGuesses : opponentGuesses,
      guesses2: players[0].address !== address ? myGuesses : opponentGuesses,
      winner: address,
    };
    const tx = await wonGame(id, eggs, data);

    console.log(tx);
    setIsOpen(false);
    setIsGameWon(false);
    if (!tx) {
      alert("An error occurred");
    }
  };

  const onChar = (value) => {
    if (currentGuess.length < 5 && !isGameEnded) {
      setCurrentGuess(`${currentGuess}${value}`);
    }
  };

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1));
  };

  const onEnter = (guess) => {
    const guessArr = String(currentGuess).split("").map(Number);
    if (
      (currentGuess.length !== 5 && guess.length !== 5) ||
      !guessArr.every((e, i, a) => a.indexOf(e) === i)
    ) {
      return;
    }
    socket.emit(
      "guess",
      id,
      currentGuess.length === 5 ? currentGuess : guess,
      address
    );
    setCurrentGuess("");
    setIsPlaying(false);
    setKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="position-relative" style={{ height: "100dvh" }}>
      <Container className="pb-3">
        <NavbarWrapper />
        <WinGame
          isOpen={isGameWon && !isGameLost}
          mint={handleWonGame}
          onClose={() => setIsGameWon(false)}
        />
        <LoseGame
          isOpen={isGameLost && !isGameWon}
          onClose={() => setIsGameLost(false)}
        />
        <ConfirmModal isOpen={isOpen} />

        <Row className="game-row justify-content-between mx-md-5 mt-3">
          <Grid
            player={players.find((x) => x.address !== address)}
            address={address}
            guesses={myGuesses}
            currentGuess={currentGuess}
            solution={oppSol}
            ready={isGameStarted}
            status={myStatus}
            injuredStatus={myInjuredStatus}
          />
          <Col md={2}>
            <Timer
              duration={duration}
              timerKey={key}
              isPlaying={isPlaying}
              onComplete={onComplete}
            />
          </Col>

          <Grid
            player={players.find((x) => x.address === address)}
            address={address}
            guesses={opponentGuesses}
            currentGuess={""}
            solution={solution}
            status={opponentStatus}
            injuredStatus={opponentInjuredStatus}
            ready={true}
          />
        </Row>

        <Keyboard
          onChar={onChar}
          onDelete={onDelete}
          onEnter={onEnter}
          guesses={myGuesses}
          isTurn={turn}
          isGameEnded={isGameEnded}
          isGameStarted={isGameStarted}
          currentGuess={currentGuess}
        />
      </Container>
    </div>
  );
}
