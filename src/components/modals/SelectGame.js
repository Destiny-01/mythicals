import React, { useEffect, useState } from "react";
import { Button, ModalBody, Modal } from "reactstrap";
import Logo from "../../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import SelectWallet from "./SelectWallet";
import { usePlayerContext } from "../../context/PlayerContext";

export default function SelectGame({ socket }) {
  const [isToggled, setIsToggled] = useState(false);
  const [disabled, setDisabled] = useState(0);
  const [unAuthenticated, setUnAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { address } = usePlayerContext();

  useEffect(() => {
    socket.on("code", (code) => {
      navigate("/lobby?code=" + code);
    });
  }, [navigate, socket]);

  const handleCreate = async (id) => {
    setDisabled(id);
    try {
      if (address) {
        if (id > 1) {
          navigate("/lobby");
        } else {
          socket.emit("createCode", address);
        }
      } else {
        setUnAuthenticated(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Button onClick={() => setIsToggled(true)}>Select mode</Button>
      {unAuthenticated ? (
        <SelectWallet button={true} />
      ) : (
        <Modal
          isOpen={isToggled}
          toggle={() => setIsToggled(!isToggled)}
          centered
        >
          <ModalBody>
            <img
              src={Logo}
              width={48}
              alt=""
              className="img-fluid mx-auto d-block mb-3 "
            />
            <h5 className="mb-3 text-center">
              Go heads-on against your friends
            </h5>

            <Button
              block
              className="mb-3"
              disabled={disabled === 1}
              onClick={() => handleCreate(1)}
            >
              Create new game
            </Button>

            <Button
              disabled={disabled === 2}
              onClick={() => handleCreate(2)}
              className="secondary-btn"
              block
            >
              Join existing
            </Button>
          </ModalBody>
        </Modal>
      )}
    </div>
  );
}
