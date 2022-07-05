import React from "react";
import { Modal } from "reactstrap";

export default function ConfirmModal({ isOpen }) {
  return (
    <div>
      <Modal isOpen={isOpen} centered backdrop="static" className="waiting">
        <div className=" text-center">
          <p className="mb-0">Waiting for verification</p>
          <p className="caption">
            please confirm transaction in metamask. Popup usually takes around
            10-30 seconds to appear
          </p>
        </div>
      </Modal>
    </div>
  );
}
