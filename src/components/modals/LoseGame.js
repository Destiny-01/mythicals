import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Button, ModalBody, Modal, ModalHeader } from "reactstrap";
import EggLost from "../../assets/eggLost.png";

export default function LoseGame({ isOpen, onClose }) {
  return (
    <Fragment>
      <Modal isOpen={isOpen} toggle={onClose} centered className="text-center">
        <ModalHeader toggle={onClose}></ModalHeader>
        <ModalBody>
          <img
            src={EggLost}
            alt=""
            className="img-fluid mx-auto d-block mb-4 "
          />
          <h5 className="mb-0 text-center">Oops, You've lost the game</h5>
          <p className="caption text-center">
            Your Opponent has guessed your eggs correctly. Don't worry,
            challenge him again and show him who is boss this time. Minimize to
            see his solution in the "My guesses section"
          </p>
          <Link to="/game">
            <Button className="mb-0">Play again</Button>
          </Link>
        </ModalBody>
      </Modal>
    </Fragment>
  );
}
