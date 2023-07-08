import React from "react";
import { Modal } from "reactstrap";

export default function ConfirmModal({ isOpen }) {
  return (
    <div>
      <Modal isOpen={isOpen} centered backdrop="static" className="waiting">
        <div className=" text-center">
          <p className="mb-0">Waiting for confirmation</p>
          <p className="caption">
            Please confirm transaction in metamask and wait for confirmation.
            This may take some few seconds
          </p>
        </div>
      </Modal>
    </div>
  );
}
