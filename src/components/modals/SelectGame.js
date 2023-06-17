import React, { useState } from "react";
import { Button, ModalBody, Modal } from "reactstrap";
import LogoRound from "../../assets/LogoRound.svg";
import { useNavigate } from "react-router-dom";
import axios from "../../config/axios";
import SelectWallet from "./SelectWallet";

export default function SelectGame() {
  const [isToggled, setIsToggled] = useState(false);
  const [disabled, setDisabled] = useState(0);
  const [unAuthenticated, setUnAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async (id) => {
    setDisabled(id);
    try {
      const accounts = await window.ethereum?.request({
        method: "eth_accounts",
      });
      if (!accounts || accounts.length === 0) {
        if (localStorage.getItem("address")?.length > 12) {
          if (id > 1) {
            navigate("/egg");
          } else {
            const res = await axios.post("/api/code", {
              address: localStorage.getItem("address"),
            });
            navigate("/egg?code=" + res.data.data);
          }
        } else {
          setUnAuthenticated(true);
        }
      } else {
        if (id > 1) {
          navigate("/egg");
        } else {
          const res = await axios.post("/api/code", {
            address: accounts[0],
          });
          navigate("/egg?code=" + res.data.data);
        }
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
              src={LogoRound}
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
