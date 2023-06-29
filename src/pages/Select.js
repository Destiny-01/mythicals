import { useState } from "react";
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
// import PerkWheel from "../components/PerkWheel";
import User1 from "../assets/lobby/User1.png";
import User2 from "../assets/lobby/User2.png";
import Versus from "../assets/lobby/versus.png";
import LogoRound from "../assets/Logo.png";
import { CurrentRow } from "../components/grid/CurrentRow";
import Keyboard from "../components/keyboard/Keyboard";
import { Link } from "react-router-dom";
import PerkWheel from "../components/PerkWheel";

export default function Select({ socket }) {
  const [currentGuess, setCurrentGuess] = useState("");
  const [canEdit, setCanEdit] = useState(false);
  const [time, setTime] = useState(20);

  const onChar = (value) => {
    if (currentGuess.length < 5) {
      setCurrentGuess(`${currentGuess}${value}`);
    }
  };

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1));
  };

  const handleSubmit = () => {};

  const onEnter = async () => {
    const guessArr = String(currentGuess)
      .split("")
      .map((currentGuess) => {
        return Number(currentGuess);
      });

    if (
      currentGuess.length !== 5 ||
      !window.location.pathname.startsWith("/egg") ||
      !guessArr.every((e, i, a) => a.indexOf(e) === i)
      //  ||
      //  !address
    ) {
      return;
    }
  };

  return (
    <Container>
      <NavbarWrapper />
      <Row className="mt-5 select">
        <Col md="3">
          <Card>
            <CardTitle>
              <h2>Select 4 Perks</h2>
            </CardTitle>
            <CardBody>
              <PerkWheel />
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Row className="select-col">
            <Col>
              <img src={User1} height={60} alt="" />
              <div className="lobby-text">
                <p>Vello</p>
              </div>
            </Col>
            <Col>
              <img src={Versus} height={48} alt="" />
            </Col>
            <Col>
              <img src={User2} height={60} alt="" />
              <div className="lobby-text">
                <p>diac</p>
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
            onEnter={onEnter}
            isTurn={true}
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
                {canEdit ? (
                  <div
                    className="pe-3"
                    role="button"
                    onClick={() => setCanEdit(false)}
                  >
                    <i className="bi bi-save" role="button"></i>
                  </div>
                ) : (
                  <div
                    className="pe-3"
                    role="button"
                    onClick={() => setCanEdit(true)}
                  >
                    <i className="bi bi-pencil" role="button"></i>
                  </div>
                )}
              </InputGroup>
              <Button block onClick={handleSubmit}>
                Start Game
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
