import React, { useState } from "react";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import NavbarWrapper from "../components/NavbarWrapper";
import Keyboard from "../components/keyboard/Keyboard";
import { Grid } from "../components/grid/Grid";
import LogoRound from "../assets/LogoRound.svg";
import { CurrentRow } from "../components/grid/CurrentRow";
import WaitingModal from "../components/modals/WaitingModal";
import { useLocation } from "react-router-dom";
import { startGame, call, getGame } from "../utils/contract";

export default function SelectEgg() {
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

  const [myGuesses, setMyGuesses] = useState([]);
  const [opponentGuesses, setOpponentGuesses] = useState([]);
  const [myStatus, setMyStatus] = useState([]);
  const [opponentStatus, setOpponentStatus] = useState([]);

  const isTurn = true;

  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  let query = useQuery();

  const [code, setCode] = useState(query.get("code") || "");

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
    console.log(
      code,
      currentGuess,
      guessArr[0],
      guessArr[1],
      guessArr[2],
      guessArr[3],
      query.get("code") ? "create" : "join"
    );
    startGame(
      code,
      currentGuess,
      guessArr[0],
      guessArr[1],
      guessArr[2],
      guessArr[3],
      query.get("code") ? "create" : "join"
    );
    call();
  };

  const onSubmit = (code) => {
    setCode(code);
  };

  return (
    <div class="position-relative" style={{ minHeight: "100vh" }}>
      <Container>
        <NavbarWrapper />
        <p className="caption fst-italic text-end">Game ID: {code}</p>
        <Row className=" mx-md-5 mt-3">
          <Col md="3"></Col>
          <Col md="6">
            <Card className="selectcard mx-auto">
              <CardBody>
                <img
                  src={LogoRound}
                  alt=""
                  className="img-fluid mx-auto d-block mb-3 "
                />
                <h5 className="mb-3 text-center">
                  Select your unique egg pack
                </h5>
                <hr
                  style={{ width: "70%", opacity: "0.1" }}
                  className="mx-auto"
                />
                <CurrentRow guess={currentGuess} select />
              </CardBody>
            </Card>
          </Col>
          <Col md="3"></Col>
        </Row>
        <WaitingModal code={code} submit={onSubmit} />
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
