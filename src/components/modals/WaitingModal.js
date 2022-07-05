import React, { useState } from "react";
import { Button, Modal, InputGroup, Input } from "reactstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";

let id = "";
const characters = "01234567890";
while (id.length < 5) {
  id += characters.charAt(Math.floor(Math.random() * characters.length));
}
export default function WaitingModal({ code, submit }) {
  const [isToggled, setIsToggled] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [inpCode, setCode] = useState("");
  const onClick = () => {
    setIsSubmitted(true);
    submit(inpCode);
  };

  const createGame = {
    title: "A new game has been created",
    body: "  Share this code with your friend to play with them. You can minimize this modal to start playing",
    icon: !isSubmitted ? "bi-clipboard2" : "bi-check",
    disabled: true,
    value: code,
  };

  const joinGame = {
    title: "You can join an exsiting game",
    body: "Enter the game code in the space below, submit the code and minimize to start playing",
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
                <i class={"bi " + data.icon}></i>
              </Button>
            </CopyToClipboard>
          </InputGroup>
          <p
            className="caption"
            style={{ textDecoration: "underline", cursor: "pointer" }}
            onClick={() => setIsToggled(!isToggled)}
          >
            Minimize
          </p>
        </div>
      </Modal>
    </div>
  );
}
