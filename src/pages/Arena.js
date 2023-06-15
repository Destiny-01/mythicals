import { useState, useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import NavbarWrapper from "../components/NavbarWrapper";
import Keyboard from "../components/keyboard/Keyboard";
// import { mintNFT } from "../utils/contract";
import { Grid } from "../components/grid/Grid";
import { useParams } from "react-router-dom";
import WinGame from "../components/modals/WinGame";
import LoseGame from "../components/modals/LoseGame";
import axios from "axios";
import Timer from "../components/Timer";

export default function Arena({ socket }) {
  const [currentGuess, setCurrentGuess] = useState("");
  const [solution, setSolution] = useState("");
  const [address, setAddress] = useState("");
  const [key, setKey] = useState(0);
  const [players, setPlayers] = useState([]);
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
  const { id } = useParams();

  useEffect(() => {
    socket.on("myGuess", (game) => {
      if (game.id === id) {
        if (game.turn === 2) {
          setMyGuesses(game.guesses.player1.map((x) => x.guess));
          setMyStatus(game.guesses.player1.map((x) => x.status));
          setTurn(false);
        } else if (game.turn === 1) {
          setMyGuesses(game.guesses.player2.map((x) => x.guess));
          setMyStatus(game.guesses.player2.map((x) => x.status));
          setTurn(false);
        }
      }
    });

    socket.on("opponentGuess", (game) => {
      if (game.id === id) {
        if (game.turn === 1) {
          setOpponentGuesses(game.guesses.player2.map((x) => x.guess));
          setOpponentStatus(game.guesses.player2.map((x) => x.status));
          setTurn(true);
          setIsPlaying(true);
        } else if (game.turn === 2) {
          setOpponentGuesses(game.guesses.player1.map((x) => x.guess));
          setOpponentStatus(game.guesses.player1.map((x) => x.status));
          setTurn(true);
          setIsPlaying(true);
        }
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

    socket.on("joined", (players) => {
      setIsGameStarted(true);
      setPlayers(players);
    });
  }, [id, socket]);

  useEffect(() => {
    window.ethereum.request({ method: "eth_accounts" }).then((accounts) => {
      axios
        .post("https://myth-arena.herokuapp.com/api/game/" + id, {
          address:
            (accounts.length > 0 || sessionStorage.getItem("address")) &&
            (accounts[0] || sessionStorage.getItem("address")),
        })
        .then((res) => {
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
            ((!game.active && game.players.length === 1) || game.active) &&
              setSolution(game.solution.player1 || game.solution.player2);
          }
        });
      setAddress(
        accounts.length > 0 ? accounts[0] : sessionStorage.getItem("address")
      );
    });
  }, [id]);

  const onComplete = (t) => {
    if (t === duration) {
      let guess = "";
      const characters = "01234567890";
      while (guess.length < 5) {
        const input = characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
        guess += !guess.includes(input) ? input : "";
      }
      onEnter(guess);
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
    const guessArr = String(currentGuess)
      .split("")
      .map((currentGuess) => {
        return Number(currentGuess);
      });
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
    <div className="position-relative" style={{ minHeight: "100vh" }}>
      <Container>
        <NavbarWrapper />
        <WinGame
          isOpen={isGameWon}
          mint={() => {}}
          // mintNFT(id, isGameWon)
          //   .then((res) => setIsGameWon(false))
          //   .catch((err) => console.log(err))

          onClose={() => setIsGameWon(false)}
        />
        <LoseGame isOpen={isGameLost} onClose={() => setIsGameLost(false)} />

        <Row className=" mx-md-5 mt-3">
          <Grid
            player={players.find(
              (x) =>
                x.address !== window.ethereum.selectedAddress ||
                sessionStorage.getItem("address")
            )}
            guesses={myGuesses}
            currentGuess={currentGuess}
            solution={oppSol}
            status={myStatus}
            ready={isGameStarted}
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
            player={players.find(
              (x) =>
                x.address === window.ethereum.selectedAddress ||
                sessionStorage.getItem("address")
            )}
            guesses={opponentGuesses}
            currentGuess={""}
            solution={solution}
            status={opponentStatus}
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
