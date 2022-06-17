import React, { useState } from "react";
import {
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Modal,
  Container,
  Row,
  Col,
} from "reactstrap";
import LogoRound from "../../assets/LogoRound.svg";
import Metamask from "../../assets/logos/Metamask.svg";
import WalletConnect from "../../assets/logos/WalletConnect.svg";
import { metamaskConnect, walletConnect } from "../../utils/connect";

export default function SelectWallet() {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsToggled(!isToggled)} className="mx-auto">
        Connect Wallet
      </Button>
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
                onClick={metamaskConnect}
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
            </Row>
          </Container>
        </ModalBody>
      </Modal>
    </div>
  );
}
