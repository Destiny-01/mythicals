import React, { Fragment, useState } from "react";
import { Button, ModalBody, ModalHeader, Modal, Input } from "reactstrap";

export default function EditGameSettings({ disabled, time, setTime }) {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <Fragment>
      <Button
        outline
        disabled={disabled}
        className="ms-2 edit-btn"
        onClick={() => setIsToggled(!isToggled)}
      >
        Edit Game Settings
      </Button>
      <Modal
        isOpen={isToggled}
        size=""
        toggle={() => setIsToggled(!isToggled)}
        centered
      >
        <ModalHeader charCode="Y" toggle={() => setIsToggled(!isToggled)}>
          Game Settings
        </ModalHeader>
        <hr />
        <ModalBody>
          <p className="mb-0">Round Time (seconds)</p>
          <Input
            className="mt-2 mb-4 py-3"
            style={{ backgroundColor: "#171A2C" }}
            value={time}
            type="number"
            step={5}
            onChange={(e) => setTime(e.target.value)}
          />
          <Button block onClick={() => setIsToggled(false)}>
            Update Settings
          </Button>
        </ModalBody>
      </Modal>
    </Fragment>
  );
}
