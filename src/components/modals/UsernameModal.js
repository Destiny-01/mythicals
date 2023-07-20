import axios from "../../config/axios";
import React, { useState } from "react";
import { Button, Modal, InputGroup, Input } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { usePlayerContext } from "../../context/PlayerContext";

export default function UsernameModal({
  isToggled,
  setIsToggled,
  address,
  provider,
}) {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const { setAddress, setProvider } = usePlayerContext();

  const onClick = () => {
    if (username.length === 0) {
      return;
    }
    axios
      .post("/api/username", {
        address,
        username,
      })
      .then((res) => {
        if (res.data.success) {
          setIsToggled(false);
          setAddress(address);
          setProvider(provider);
          navigate("/welcome");
        } else {
          alert("something went wrong");
        }
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
