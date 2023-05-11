import React, { useState } from "react";
import { Button, ModalBody, Modal, Container, Row, Col } from "reactstrap";
import LogoRound from "../../assets/LogoRound.svg";
import Metamask from "../../assets/logos/Metamask.svg";
import WalletConnect from "../../assets/logos/WalletConnect.svg";
import NoWallet from "../../assets/logos/no-wallet.png";
import {
  burnerWallet,
  metamaskConnect,
  walletConnect,
} from "../../utils/connect";
import UsernameModal from "./UsernameModal";

export default function SelectWallet({ button }) {
  const [isToggled, setIsToggled] = useState(button || false);
  const [isModalToggled, setIsModalToggled] = useState(false);
  const connectMetamask = async () => {
    metamaskConnect().then((success) => {
      if (success) {
        setIsToggled(false);
        setIsModalToggled(true);
      }
    });
  };
  const connectBurner = async () => {
    burnerWallet().then((success) => {
      if (success) {
        setIsToggled(false);
        setIsModalToggled(true);
      }
    });
  };

  return (
    <div>
      {!button && (
        <Button onClick={() => setIsToggled(!isToggled)} className="mx-auto">
          Connect Wallet
        </Button>
      )}
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
          <h5 className="mb-3 text-center">Select preferred wallet provider</h5>
          <Container>
            <Row>
              <Col
                className="text-center"
                onClick={connectMetamask}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={Metamask}
                  alt=""
                  className="img-fluid mx-auto d-block mb-3 "
                />
                <p className="mb-0">Metamask</p>
                <p className="caption text-grey">Recommended for desktop</p>
              </Col>
              <Col
                className="text-center"
                onClick={walletConnect}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={WalletConnect}
                  alt=""
                  className="img-fluid mx-auto d-block mb-3 "
                />
                <p className="mb-0">Wallet Connect</p>
                <p className="caption text-grey">Recommended for mobile</p>
              </Col>
              <Col
                className="text-center"
                onClick={connectBurner}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={NoWallet}
                  alt=""
                  height={64}
                  width={60}
                  className="img-fluid rounded-circle mx-auto d-block mb-3 "
                />
                <p className="mb-0">No wallet?</p>
                <p className="caption text-grey">Create a burner wallet</p>
              </Col>
            </Row>
          </Container>
        </ModalBody>
      </Modal>
      <UsernameModal
        isToggled={isModalToggled}
        setIsToggled={setIsModalToggled}
      />
    </div>
  );
}
