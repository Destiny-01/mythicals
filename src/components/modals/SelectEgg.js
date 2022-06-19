import React, { useState } from "react";
import { Button, ModalBody, ModalFooter, ModalHeader, Modal } from "reactstrap";
import LogoRound from "../../assets/LogoRound.svg";

export default function SelectEgg() {
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
          <h5 className="mb-3 text-center">Select your unique egg pack</h5>
          <Button block className="mb-3">
            Create new game
          </Button>

          <Button block>Join existing</Button>
        </ModalBody>
      </Modal>
    </div>
  );
}
