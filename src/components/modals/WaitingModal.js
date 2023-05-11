import React, { useState } from "react";
import { Button, Modal, InputGroup, Input } from "reactstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function WaitingModal({ code, submit }) {
  const [isToggled, setIsToggled] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [inpCode, setCode] = useState("");
  const [address, setAddress] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.ethereum.request({ method: "eth_accounts" }).then((accounts) => {
      accounts.length > 0 || sessionStorage.getItem("address")
        ? setAddress(accounts[0] || sessionStorage.getItem("address"))
        : navigate("/game");
    });
  }, [navigate]);

  const onClick = () => {
    if (!code) {
      axios
        .post("http://localhost:8000/api/check-code", {
          address,
          code: inpCode,
        })
        .then((res) => {
          if (res && res.data.success) {
            setIsSubmitted(true);
            submit(inpCode);
            setIsToggled(false);
          }
        })
        .catch((err) => alert("Invalid game code"));
      return;
    }
    setIsSubmitted(true);
    submit(inpCode);
  };

  const createGame = {
    title: "A new game has been created",
    body: "  Share this code with your friend to play with them. You can minimize this modal to choose your eggs and start playing",
    icon: !isSubmitted ? "bi-clipboard2" : "bi-check",
    disabled: true,
    value: code,
  };

  const joinGame = {
    title: "You can join an exsiting game",
    body: "Enter the game code in the space below, submit the code and choose your eggs to start playing",
    icon: !isSubmitted ? "bi-send" : "bi-check",
    disabled: false,
    value: "",
  };

  const data = code ? createGame : joinGame;

  return (
    <div>
      <Modal
        isOpen={isToggled}
        toggle={() => setIsToggled(!isToggled)}
        centered
        backdrop="static"
        className="waiting"
      >
        <div className=" text-center">
          <p className="mb-0">{data.title}</p>
          <p className="caption">{data.body}</p>

          <InputGroup className="mx-auto mb-3" style={{ width: "70%" }}>
            <Input
              defaultValue={data.value}
              className="waiting-input"
              onChange={(e) => setCode(e.target.value)}
              disabled={data.disabled}
            />
            <CopyToClipboard text={code}>
              <Button onClick={onClick}>
                <i className={"bi " + data.icon}></i>
              </Button>
            </CopyToClipboard>
          </InputGroup>
          {code && (
            <p
              className="caption"
              style={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={() => setIsToggled(!isToggled)}
            >
              Minimize
            </p>
          )}
        </div>
      </Modal>
    </div>
  );
}
