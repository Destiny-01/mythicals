import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Button, ModalBody, Modal, ModalHeader } from "reactstrap";
import EggReward from "../../assets/eggReward.png";

export default function WinGame({ isOpen, mint, onClose }) {
  return (
    <Fragment>
      <Modal isOpen={isOpen} toggle={onClose} centered className="text-center">
        <ModalHeader toggle={onClose}></ModalHeader>
        <ModalBody>
          <img
            src={EggReward}
            alt=""
            className="img-fluid mx-auto d-block mb-4 "
          />
          <h5 className="mb-0 text-center">
            Congratulations, You've won the game.
          </h5>
          <p className="caption text-center">
            As a reward from the game master, you get back 5 random eggs
          </p>

          <Button className="" onClick={mint}>
            Claim Rewards
          </Button>
          <div className="mb-0 mt-2 text-center">
            <Link to="/game" className="text-underline">
              Play Again
            </Link>
          </div>
        </ModalBody>
      </Modal>
    </Fragment>
  );
}
