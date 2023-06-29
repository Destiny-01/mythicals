import React, { Fragment, useState } from "react";
import { Button, ModalBody, ModalHeader, Modal } from "reactstrap";

export default function HowToPlay() {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <Fragment>
      <Button
        className="ms-2 secondary-btn"
        onClick={() => setIsToggled(!isToggled)}
      >
        How to play
      </Button>
      <Modal
        isOpen={isToggled}
        toggle={() => setIsToggled(!isToggled)}
        centered
      >
        <ModalHeader charCode="Y" toggle={() => setIsToggled(!isToggled)}>
          How To Play
        </ModalHeader>
        <hr />
        <ModalBody>
          The aim of the game is to guess the enemy's eggs egg correctly. After
          each guess, the state of the egg will change to show you the status.
          If the egg has a bloodstain on it, it means the egg is part of his
          eggs and in the right position. If it has a medic sign, it means the
          egg is part of his egg but not in the right position. If it doesn't
          have any identifier, it means the egg is not part of his eggs. <br />{" "}
          Enjoy!
        </ModalBody>
      </Modal>
    </Fragment>
  );
}
