import React, { useState } from "react";
import { Button, ModalBody, ModalFooter, ModalHeader, Modal } from "reactstrap";
import LogoRound from "../../assets/LogoRound.svg";
import { Link } from "react-router-dom";

let id = "";
const characters = "01234567890";
while (id.length < 5) {
  id += characters.charAt(Math.floor(Math.random() * characters.length));
}
export default function SelectGame() {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsToggled(!isToggled)}>Select mode</Button>
      <Modal
        isOpen={isToggled}
        toggle={() => setIsToggled(!isToggled)}
        centered
      >
        <ModalBody>
          <img
            src={LogoRound}
            alt=""
            className="img-fluid mx-auto d-block mb-3 "
          />
          <h5 className="mb-3 text-center">Go heads-on against your friends</h5>

          <Link to={`/egg?code=${id}`}>
            <Button block className="mb-3">
              Create new game
            </Button>
          </Link>

          <Link to={`/egg`}>
            <Button block>Join existing</Button>
          </Link>
        </ModalBody>
      </Modal>
    </div>
  );
}
