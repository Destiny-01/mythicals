import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Input,
  InputGroup,
  Row,
} from "reactstrap";
import NavbarWrapper from "../components/NavbarWrapper";
import PerkWheel from "../components/PerkWheel";
import { useGameContext } from "../context/GameContext";
import { usePlayerContext } from "../context/PlayerContext";
import { initGame } from "../utils/contract";
import User1 from "../assets/lobby/User1.png";
import User2 from "../assets/lobby/User2.png";
import Versus from "../assets/lobby/versus.png";
import LogoRound from "../assets/Logo.png";
import { CurrentRow } from "../components/grid/CurrentRow";
import Keyboard from "../components/keyboard/Keyboard";
import Lock from "../assets/icons/lock.svg";
import Edit from "../assets/icons/edit.svg";
import ConfirmModal from "../components/modals/ConfirmModal";

export default function Select({ socket }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [currentGuess, setCurrentGuess] = useState("");
  const [player, setPlayer] = useState(0);
  const [perks, setPerks] = useState([]);
  const [canEdit, setCanEdit] = useState(false);
  const [time, setTime] = useState(20);
  const { game, setGame } = useGameContext();
  const { address, player: currentPlayer } = usePlayerContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (game) {
      console.log(game.player1.address, address);
      if (game.player1.address === address) {
        setPlayer(1);
      } else if (game.player2.address === address) {
        setPlayer(2);
      }
    }

    socket.on("init", (id, gameCode) => {
      console.log("init", id, game.code);
      if ((id === 1 && player === 1) || (id === 2 && player === 2)) {
        setGame((currentGame) => ({ ...currentGame, code: gameCode, time }));
        navigate("/room/" + gameCode);
      }
    });

    socket.on("time", (time) => {
      console.log(time);
      setTime(time);
    });

    socket.on("joinedGame", () => {
      setIsGameStarted(true);
    });
  }, [address, game, navigate, player, setGame, socket, time]);

  const onChar = (value) => {
    if (currentGuess.length < 5) {
      setCurrentGuess(`${currentGuess}${value}`);
    }
  };

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1));
  };

  const handleSubmitTime = () => {
    setCanEdit(false);
    socket.emit("time", time);
  };

  const handleSubmit = async () => {
    const guessArr = String(currentGuess)
      .split("")
      .map((currentGuess) => {
        return Number(currentGuess);
      });

    if (
      currentGuess.length !== 5 ||
      !window.location.pathname.startsWith("/select") ||
      !guessArr.every((e, i, a) => a.indexOf(e) === i)
    ) {
      return alert("An error occurred. You must choose 5 unique eggs");
    }

    console.log(perks);
    player === 1
      ? setGame((prevGame) => ({
          ...prevGame,
          player1: { ...prevGame.player1, perks },
        }))
      : setGame((prevGame) => ({
          ...prevGame,
          player2: { ...prevGame.player2, perks },
        }));
    setTimeout(() => console.log(game), 3000);
    setIsOpen(true);
    const tx = await initGame(game.code, guessArr, player - 1);
    setIsOpen(false);

    if (tx) {
      console.log(tx);
      socket.emit(
        player === 1 ? "newGame" : "joinGame",
        game.code,
        currentGuess,
        address,
        time
      );
    } else {
      alert("An error occurred. Try sending again");
    }
  };

  if (!address) {
    return navigate("/game");
  }

  return (
    <Container>
      <NavbarWrapper />
      <Row className="select">
        <Col md="3">
          <Card>
            <CardTitle>
              <h2>Select 4 Perks</h2>
            </CardTitle>
            <CardBody>
              <PerkWheel setPerks={setPerks} />
              {/* <div className="position-absolute left-30 text-center">
                <img src={Lock} alt="" />
                <h5> Coming Soon</h5>
              </div> */}
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Row className="select-col">
            <Col>
              <img src={User1} height={60} alt="" />
              <div className="lobby-text">
                <p>{game.player1.username}</p>
              </div>
            </Col>
            <Col>
              <img src={Versus} height={48} alt="" />
            </Col>
            <Col>
              <img src={User2} height={60} alt="" />
              <div className="lobby-text">
                <p>{game.player2.username}</p>
              </div>
            </Col>
          </Row>
          <Card className="selectcard mx-auto mt-3">
            <CardBody>
              <img
                src={LogoRound}
                alt=""
                height={48}
                className="img-fluid mx-auto d-block mb-3 "
              />
              <h2 className="mb-3 text-center">
                Create your unique pack of 5 eggs to begin
              </h2>
              <CurrentRow guess={currentGuess} select />
            </CardBody>
          </Card>
          <Keyboard
            onChar={onChar}
            onDelete={onDelete}
            isTurn={true}
            balances={currentPlayer.balances}
            currentGuess={currentGuess}
          />
        </Col>
        <Col md="3">
          <Card>
            <CardTitle>
              <h2>Game Tips</h2>
            </CardTitle>
            <CardBody>
              <ul className="mb-5 text-grey">
                <li>
                  A perk can only be used in the first half of the round time
                  eg, If game time is 20s, perk must be used in the first 10sec
                  of that round
                </li>
                <li>
                  A draw is declared if both players guess each other cards in
                  the same round pair
                </li>
                <li>
                  At the end of the timer, There would be a random selection on
                  your behalf
                </li>
              </ul>
              <Link to="#">View Full Game Rules</Link>
            </CardBody>
          </Card>
          <Card className="my-3">
            <CardTitle>Start Battle</CardTitle>
            <CardBody>
              <p className="mb-0">Round Time (seconds)</p>
              <InputGroup className="mb-3">
                <Input
                  className="py-3"
                  value={time}
                  type="number"
                  disabled={!canEdit}
                  step={5}
                  onChange={(e) => setTime(e.target.value)}
                />
                {console.log(player, canEdit)}
                {canEdit && player === 1 ? (
                  <div
                    className="pe-3"
                    role="button"
                    onClick={handleSubmitTime}
                  >
                    <i className="bi bi-save" role="button"></i>
                  </div>
                ) : (
                  player === 1 && (
                    <div
                      className="pe-3"
                      role="button"
                      onClick={() => setCanEdit(true)}
                    >
                      <img src={Edit} alt="" />
                    </div>
                  )
                )}
              </InputGroup>
              <Button
                block
                onClick={handleSubmit}
                className={!isGameStarted && player === 2 && "fst-italic"}
                disabled={
                  currentGuess.length !== 5 || (!isGameStarted && player === 2)
                }
              >
                {isGameStarted
                  ? "Join Game"
                  : player === 1
                  ? "Start Game"
                  : "waiting for opponent to enter game"}
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <ConfirmModal isOpen={isOpen} />
    </Container>
  );
}
