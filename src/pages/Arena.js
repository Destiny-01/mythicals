import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import NavbarWrapper from "../components/NavbarWrapper";
import Keyboard from "../components/keyboard/Keyboard";
import { contract, subscription } from "../utils/contract";
import { Grid } from "../components/grid/Grid";

export default function Arena() {
  const [currentGuess, setCurrentGuess] = useState("");
  const [solution, setSolution] = useState("");
  const [isGameWon, setIsGameWon] = useState(false);
  const [isLoseModalOpen, setIsLoseModalOpen] = useState(false);
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [isEnter, setIsEnter] = useState(false);
  const [isAboutModalOpen, setAboutModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isWordNotFoundAlertOpen, setIsWordNotFoundAlertOpen] = useState(false);
  const [turn, setTurn] = useState(1);
  const [oppGameCode, setOppGameCode] = useState("");
  const [myGuesses, setMyGuesses] = useState([]);
  const [opponentGuesses, setOpponentGuesses] = useState([]);
  const [myStatus, setMyStatus] = useState([]);
  const [opponentStatus, setOpponentStatus] = useState([]);
  console.log(contract, subscription, "contract");

  const isTurn = true;

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
            solution={""}
            isTurn={isTurn}
            status={myStatus}
          />
          <Col></Col>
          <Grid
            player="My"
            guesses={myGuesses}
            currentGuess={currentGuess}
            solution={""}
            isTurn={isTurn}
            status={myStatus}
          />
        </Row>

        <Keyboard
          solution={solution}
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
