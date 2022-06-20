import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import NavbarWrapper from "../components/NavbarWrapper";
import Keyboard from "../components/keyboard/Keyboard";
import { contract, subscription, getGame } from "../utils/contract";
import { Grid } from "../components/grid/Grid";
import { useParams } from "react-router-dom";
import Web3 from "web3";
const web3 = new Web3(window.ethereum);

export default function Arena() {
  const [currentGuess, setCurrentGuess] = useState("");
  const [solution, setSolution] = useState("");
  const [isGameWon, setIsGameWon] = useState(false);
  const [isLoseModalOpen, setIsLoseModalOpen] = useState(false);
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [isEnter, setIsEnter] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(true);
  const [isWordNotFoundAlertOpen, setIsWordNotFoundAlertOpen] = useState(false);
  const [turn, setTurn] = useState(1);
  const [oppGameCode, setOppGameCode] = useState("");
  const [myGuesses, setMyGuesses] = useState([]);
  const [opponentGuesses, setOpponentGuesses] = useState([]);
  const [game, setGame] = useState(null);
  const [myStatus, setMyStatus] = useState([]);
  const [opponentStatus, setOpponentStatus] = useState([]);

  const isTurn = true;
  const { id } = useParams();
  useEffect(() => {
    getGame(id).then((game) => {
      console.log(game, game.player1, localStorage.getItem("_metamask"));
      setGame(game);
      setSolution(
        game.player1.toUpperCase() ===
          localStorage.getItem("_metamask").toUpperCase()
          ? game.solution1
          : game.solution2
      );
      if (
        game &&
        (!web3.utils.isAddress(game.player1) ||
          !web3.utils.isAddress(game.player2))
      ) {
        console.log("nn");
        setIsPlayerReady(false);
      }
    });
  }, []);

  const onChar = (value) => {
    if (currentGuess.length < 5 && !isGameEnded) {
      setCurrentGuess(`${currentGuess}${value}`);
    }
  };

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1));
  };

  const onEnter = () => {
    const guessArr = String(currentGuess)
      .split("")
      .map((currentGuess) => {
        return Number(currentGuess);
      });
    if (
      currentGuess.length !== 5 ||
      !guessArr.every((e, i, a) => a.indexOf(e) === i)
    ) {
      setIsWordNotFoundAlertOpen(true);
      return setTimeout(() => {
        setIsWordNotFoundAlertOpen(false);
      }, 3000);
    }
    setMyGuesses((guess) => [...guess, currentGuess]);
    setCurrentGuess("");
    // verifyGuess(inputs).then((verified) => {
    //  verified ===true&&  setCurrentGuess('')
    // })
  };

  return (
    <div class="position-relative" style={{ minHeight: "100vh" }}>
      <Container>
        <NavbarWrapper />
        <Row className=" mx-md-5 mt-3">
          <Grid
            player="My"
            guesses={myGuesses}
            currentGuess={currentGuess}
            solution={solution}
            isTurn={isTurn}
            status={myStatus}
            ready={true}
          />
          <Col></Col>

          <Grid
            player="My"
            guesses={myGuesses}
            currentGuess={currentGuess}
            solution={""}
            isTurn={isTurn}
            status={myStatus}
            ready={isPlayerReady}
          />
        </Row>

        <Keyboard
          onChar={onChar}
          onDelete={onDelete}
          onEnter={onEnter}
          guesses={myGuesses}
          isTurn={isTurn}
          currentGuess={currentGuess}
        />
      </Container>
    </div>
  );
}
