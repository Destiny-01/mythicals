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
    window.ethereum
      .request({ method: "eth_accounts" })
      .then((accounts) => {
        if (accounts.length === 0) {
          if (sessionStorage.getItem("address")?.length > 12) {
            id > 1
              ? navigate("/egg")
              : axios
                  .post("https://mythicals.onrender.com/api/code", {
                    address: sessionStorage.getItem("address"),
                  })
                  .then((res) => {
                    navigate("/egg?code=" + res.data.data);
                  })
                  .catch((err) => console.log(err));
            return;
          }
          setUnAuthenticated(true);
        } else {
          id > 1
            ? navigate("/egg")
            : axios
                .post("https://mythicals.onrender.com/api/code", {
                  address: accounts[0],
                })
                .then((res) => {
                  navigate("/egg?code=" + res.data.data);
                })
                .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
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
