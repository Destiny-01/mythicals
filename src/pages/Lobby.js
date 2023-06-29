import React, { useEffect, useState } from "react";
import { Col, Container, Input, InputGroup, Row } from "reactstrap";
import { useLocation, useNavigate } from "react-router-dom";
import CopyToClipboard from "react-copy-to-clipboard";
import { useAppContext } from "../context/AppContext";
import Versus from "../assets/lobby/versus.png";
import User1 from "../assets/lobby/User1.png";
import User2 from "../assets/lobby/User2.png";
import UserDefault from "../assets/lobby/Default.png";
import CopyIcon from "../assets/icons/copy.svg";
import CheckIcon from "../assets/icons/check.svg";
import SendIcon from "../assets/icons/submit.svg";

export default function Lobby({ socket }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [inpCode, setCode] = useState("");
  const [otherPlayer, setOtherPlayer] = useState(null);
  const { address, player } = useAppContext();
  const query = useQuery();
  const navigate = useNavigate();
  const code = query.get("code");

  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  useEffect(() => {
    socket.on("joined", (player1) => {
      if (code) {
        setOtherPlayer(player1.username);
        setTimeout(() => {
          navigate("/room/" + code);
        }, 3000);
      }
    });

    socket.on("player1", (player) => {
      if (!code) {
        setOtherPlayer(player.username);
        setTimeout(() => {
          navigate("/room/" + code);
        }, 3000);
      }
    });

    socket.on("wrongCode", () => {
      setIsSubmitted(false);
      alert("Invalid code. If code is correct, try reloading the page");
    });
  }, [code, navigate, socket]);

  const onClick = () => {
    if (isSubmitted) {
      return;
    }
    !code && socket.emit("checkCode", inpCode, address);
    setIsSubmitted(true);
  };

  const createGame = {
    title: "Invite Opponent",
    body: "The game will begin once the opponent joins the room. Share this code with your friends to invite them",
    image: !isSubmitted ? CopyIcon : CheckIcon,
    disabled: true,
    value: code,
  };

  const joinGame = {
    title: "Join game",
    body: "The game will begin once you join the room. Input game code below",
    image: !isSubmitted ? SendIcon : CheckIcon,
    disabled: false,
    value: "",
  };

  const data = code ? createGame : joinGame;

  return (
    <Container className="lobby text-center">
      <h2 className="mb-5">Get Ready to Battle</h2>
      <Row className="mt-5 mb-3">
        {code ? (
          <Col>
            <img src={User1} alt="" />
            <div className="lobby-text">
              <p>{player.username}</p>
            </div>
          </Col>
        ) : otherPlayer ? (
          <Col>
            <img src={User1} alt="" />
            <div className="lobby-text">
              <p>{otherPlayer}</p>
            </div>
          </Col>
        ) : (
          <Col>
            <img src={UserDefault} alt="" />
            <div className="lobby-text italics">
              <p>waiting</p>
            </div>
          </Col>
        )}
        <Col>
          <img src={Versus} alt="" />
        </Col>
        {!code ? (
          <Col>
            <img src={User2} alt="" />
            <div className="lobby-text">
              <p>{player.username}</p>
            </div>
          </Col>
        ) : otherPlayer ? (
          <Col>
            <img src={User2} alt="" />
            <div className="lobby-text">
              <p>{otherPlayer}</p>
            </div>
          </Col>
        ) : (
          <Col>
            <img src={UserDefault} alt="" />
            <div className="lobby-text italics">
              <p>waiting</p>
            </div>
          </Col>
        )}
      </Row>
      {/* <Row>
        <Col>
          <img src={User1} alt="" />
          <div className="lobby-text">
            <p>Vello</p>
          </div>
        </Col>

        <Col>
          <img src={Versus} alt="" />
        </Col>
        <Col>
          <img src={UserDefault} alt="" />
          <div className="lobby-text italic">
            <p>waiting</p>
          </div>
        </Col>
      </Row> */}
      <div className="text-center mt-3 input-container">
        <p className="mb-0">{data.title}</p>
        <p className="caption">{data.body}</p>

        <InputGroup className="mx-auto mb-3 bg-green">
          <Input
            defaultValue={data.value}
            className="waiting-input"
            onChange={(e) => setCode(e.target.value)}
            disabled={data.disabled}
          />
          <CopyToClipboard text={code}>
            <div className="p-1" role="button" onClick={onClick}>
              <img src={data.image} alt="icon" />
            </div>
          </CopyToClipboard>
        </InputGroup>
      </div>
    </Container>
  );
}
