import React, { Fragment } from "react";
import { Button, ModalBody, Modal, ModalHeader } from "reactstrap";
import EggReward from "../../assets/eggReward.png";

export default function WinGame({ isOpen, mint, onClose }) {
  return (
    <Fragment>
      <Modal
        isOpen={isOpen.length > 0}
        toggle={onClose}
        centered
        className="text-center"
      >
        <ModalHeader toggle={onClose}></ModalHeader>
        <ModalBody>
          <img
            src={EggReward}
            alt=""
            className="img-fluid mx-auto d-block mb-4 "
          />
          <h5 className="mb-0 text-center">
            Congratulations, You've won the game
          </h5>
          <p className="caption text-center">
            Here's a reawrd from the game master. You can mint the NFT below to
            add to your collection{" "}
          </p>

          <Button className="mb-0" onClick={mint}>
            Mint NFT
          </Button>
        </ModalBody>
      </Modal>
    </Fragment>
  );
}
