/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import NavbarWrapper from "../components/NavbarWrapper";
import Keyboard from "../components/keyboard/Keyboard";
import {
  contract,
  convert,
  getGame,
  getGuessStatuses,
  guessCode,
  mintNFT,
} from "../utils/contract";
import { Grid } from "../components/grid/Grid";
import { useParams } from "react-router-dom";
import { BigNumber } from "ethers";
import ConfirmModal from "../components/modals/ConfirmModal";
import WinGame from "../components/modals/WinGame";
import LoseGame from "../components/modals/LoseGame";

export default function Arena() {
  const [currentGuess, setCurrentGuess] = useState("");
  const [solution, setSolution] = useState("");
  const [isGameWon, setIsGameWon] = useState("");
  const [isGameLost, setIsGameLost] = useState(false);
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGuessedModalOpen, setIsGuessedModalOpen] = useState(false);
  const [turn, setTurn] = useState(false);
  const [oppSol, setOppSol] = useState("");
  const [myGuesses, setMyGuesses] = useState([]);
  const [opponentGuesses, setOpponentGuesses] = useState([]);
  const [myStatus, setMyStatus] = useState([]);
  const [opponentStatus, setOpponentStatus] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getGame(id).then((gam) => {
      console.log("game", gam);
      gam.player1.toUpperCase() ===
        localStorage.getItem("_metamask").toUpperCase() &&
      gam.guesses1.length > 0
        ? setTurn(true)
        : setTurn(
            gam.turn.toUpperCase() ===
              localStorage.getItem("_metamask").toUpperCase()
          );
      gam.guesses1.length > 0 && gam.active && setIsGameStarted(true);
      if (/^0x0+$/.test(gam.player1) && /^0x0+$/.test(gam.player2)) {
        console.log("nn");
        setIsGameEnded(true);
        return;
      }
      let sol = 0;
      const player =
        gam.player1.toUpperCase() ===
        localStorage.getItem("_metamask").toUpperCase()
          ? 1
          : gam.player2.toUpperCase() ===
            localStorage.getItem("_metamask").toUpperCase()
          ? 2
          : null;
      !/^0x0+$/.test(gam.winner) &&
        (player === 1 ? setOppSol(gam.solution2) : setOppSol(gam.solution1));
      let statusM = [];
      const statusMy = [];
      const statusOpp = [];
      if (player === 1) {
        sol = BigNumber.from(gam.solution1).toString();
        gam.guesses2.length > 0 && setOpponentGuesses(convert(gam.guesses2));
        statusM[1] = gam.status2;
        gam.guesses1.length > 0 && setMyGuesses(convert(gam.guesses1));
        statusM[0] = gam.status1;
      } else if (player === 2) {
        sol = BigNumber.from(gam.solution2).toString();
        gam.guesses1.length > 0 && setOpponentGuesses(convert(gam.guesses1));
        statusM[1] = gam.status1;
        gam.guesses2.length > 0 && setMyGuesses(convert(gam.guesses2));
        statusM[0] = gam.status2;
      }
      statusM[0].forEach((s) => {
        statusMy.push(getGuessStatuses(s));
      });
      statusM[1].forEach((s) => {
        statusOpp.push(getGuessStatuses(s));
      });
      setOpponentStatus((statuses) => [...statuses, ...statusOpp]);
      setMyStatus((statuses) => [...statuses, ...statusMy]);
      setSolution(sol.length < 5 ? "0" + sol : sol);
    });
  }, [id, isGameStarted]);

  useEffect(() => {
    console.log("bululu");
    contract.on("Guessed", (_id, player, guess, statu) => {
      console.log("bululululul");
      if (
        opponentGuesses.includes(guess) ||
        id !== _id.toString() ||
        player.toUpperCase() === window.ethereum.selectedAddress.toUpperCase()
      ) {
        return;
      }
      setOpponentGuesses((guesses) => [...guesses, guess.toString()]);
      const status = [];
      statu.forEach((s) => status.push(s.toString()));
      status.length < 5 && status.unshift("0");
      const stat = getGuessStatuses(status);
      console.log(_id, player, guess, status, stat);

      setOpponentStatus((statuses) => [...statuses, stat]);
      if (stat.every((x) => x === "dead")) {
        setIsGameLost(true);
        setIsGameEnded(true);
        getGame(id).then((gam) => {
          gam.player1 === window.ethereum.selectedAddress
            ? setOppSol(gam.solution2)
            : setOppSol(gam.solution1);
        });
      }
      setTurn(true);
    });
  }, []);

  useEffect(() => {
    !isGameStarted &&
      contract.on("GameJoined", (_id) => {
        if (id !== _id.toString()) {
          return;
        }
        setIsGameStarted(true);
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
      return;
    }
    setIsGuessedModalOpen(true);
    guessCode(id, guessArr)
      .then((statuses) => {
        console.log(statuses, "lkoikj");
        setMyStatus((status) => [...status, statuses]);
        setMyGuesses((guess) => [...guess, currentGuess]);
        setTurn(false);
        setIsGuessedModalOpen(false);
        if (statuses.every((x) => x === "dead")) {
          setIsGameWon(currentGuess);
          setIsGameEnded(true);
          getGame(id).then((gam) => {
            gam.player1 === window.ethereum.selectedAddress
              ? setOppSol(gam.solution2)
              : setOppSol(gam.solution1);
          });
        }
        setCurrentGuess("");
      })
      .catch((err) => console.log(err));
  };
  console.log(myStatus, opponentStatus, oppSol);

  return (
    <div class="position-relative" style={{ minHeight: "100vh" }}>
      <Container>
        <NavbarWrapper />
        <WinGame
          isOpen={isGameWon}
          mint={() =>
            mintNFT(id, isGameWon)
              .then((res) => setIsGameWon(""))
              .catch((err) => console.log(err))
          }
          onClose={() => setIsGameWon("")}
        />
        <LoseGame isOpen={isGameLost} onClose={() => setIsGameLost(false)} />

        <ConfirmModal isOpen={isGuessedModalOpen} />
        <Row className=" mx-md-5 mt-3">
          <Grid
            player="Your"
            guesses={myGuesses}
            currentGuess={currentGuess}
            solution={oppSol}
            status={myStatus}
            ready={isGameStarted}
          />
          <Col></Col>

          <Grid
            player="Opponent"
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
          currentGuess={currentGuess}
        />
      </Container>
    </div>
  );
}
