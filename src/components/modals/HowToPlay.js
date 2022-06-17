import React, { Fragment, useState } from "react";
import { Button, ModalBody, ModalFooter, ModalHeader, Modal } from "reactstrap";
import LogoRound from "../../assets/LogoRound.svg";

export default function HowToPlay() {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <Fragment>
      <Button outline className="ms-2" onClick={() => setIsToggled(!isToggled)}>
        How to play
      </Button>
      <Modal
        isOpen={isToggled}
        toggle={() => setIsToggled(!isToggled)}
        centered
      >
        <ModalHeader charCode="Y" toggle={() => setIsToggled(!isToggled)}>
          Modal title
        </ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </ModalBody>
      </Modal>
    </Fragment>
  );
}
