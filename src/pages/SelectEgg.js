import React, { useState } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import NavbarWrapper from "../components/NavbarWrapper";
import Keyboard from "../components/keyboard/Keyboard";
import LogoRound from "../assets/LogoRound.svg";
import { CurrentRow } from "../components/grid/CurrentRow";
import WaitingModal from "../components/modals/WaitingModal";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import EditGameSettings from "../components/modals/EditGameSettings";

export default function SelectEgg({ socket }) {
  const [currentGuess, setCurrentGuess] = useState("");
  const [time, setTime] = useState(20);
  const navigate = useNavigate();
  let query = useQuery();
  const [code, setCode] = useState(query.get("code") || "");

  useEffect(() => {
    socket.on("init", (id, gameCode) => {
      if ((id === 1 && query.get("code")) || (id === 2 && !query.get("code"))) {
        navigate("/room/" + gameCode);
      }
    });
  }, [navigate, query, socket]);

  const isTurn = true;

  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  const onChar = (value) => {
    if (currentGuess.length < 5) {
      setCurrentGuess(`${currentGuess}${value}`);
    }
  };

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1));
  };

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
    ) {
      return;
    }

    const accounts = await window.ethereum?.request({ method: "eth_accounts" });

    if (accounts?.length === 0 && !sessionStorage.getItem("address")) {
      return;
    }
    console.log(
      query.get("code") ? "newGame" : "joinGame",
      code,
      currentGuess,
      accounts ? accounts[0] : sessionStorage.getItem("address"),
      time
    );

    socket.emit(
      query.get("code") ? "newGame" : "joinGame",
      code,
      currentGuess,
      accounts ? accounts[0] : sessionStorage.getItem("address"),
      time
    );
  };

  const onSubmit = (inpCode) => {
    inpCode && setCode(inpCode);
  };

  return (
    <div className="position-relative" style={{ height: "100dvh" }}>
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
        <div className="text-center mt-4">
          <p>
            <span style={{ color: "#C3C3C3" }}>Round Time:</span>
            <span className="ms-3">{time}s</span>
          </p>
          <EditGameSettings
            time={time}
            setTime={setTime}
            disabled={query.get("code") === null}
          />
        </div>
        <Keyboard
          onChar={onChar}
          onDelete={onDelete}
          onEnter={onEnter}
          isTurn={isTurn}
          currentGuess={currentGuess}
        />
        <WaitingModal code={query.get("code")} submit={onSubmit} />
      </Container>
    </div>
  );
}
