import axios from "../../config/axios";
import React, { useState } from "react";
import { Button, Modal, InputGroup, Input } from "reactstrap";

export default function UsernameModal({ isToggled, setIsToggled }) {
  const [username, setUsername] = useState("");
  const onClick = () => {
    if (username.length === 0) {
      return;
    }
    axios
      .post("/username", {
        address:
          window.ethereum?.selectedAddress || sessionStorage.getItem("address"),
        username,
      })
      .then((res) => {
        setIsToggled(false);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Modal
      isOpen={isToggled}
      toggle={() => setIsToggled(!isToggled)}
      centered
      backdrop="static"
      className="waiting"
    >
      <div className=" text-center">
        <p>Welcome, what would you like to be known as?</p>

        <InputGroup className="mx-auto mb-3" style={{ width: "70%" }}>
          <Input
            className="waiting-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button onClick={onClick}>
            <i className="bi bi-send"></i>
          </Button>
        </InputGroup>
      </div>
    </Modal>
  );
}
