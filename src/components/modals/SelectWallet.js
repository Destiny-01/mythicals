import React, { useState } from "react";
import { Button, ModalBody, Modal, Container, Row, Col } from "reactstrap";
import LogoRound from "../../assets/Logo.png";
import Metamask from "../../assets/logos/Metamask.svg";
import WalletConnect from "../../assets/logos/WalletConnect.svg";
import NoWallet from "../../assets/logos/no-wallet.png";
import {
  burnerWallet,
  metamaskConnect,
  walletConnect,
} from "../../utils/connect";
import UsernameModal from "./UsernameModal";
import { useAppContext } from "../../context/AppContext";

export default function SelectWallet({ button }) {
  const [isToggled, setIsToggled] = useState(button || false);
  const [isModalToggled, setIsModalToggled] = useState(false);
  const [address, setReturnedAddress] = useState("");
  const [provider, setReturnedProvider] = useState("");
  const { setAddress, setProvider } = useAppContext();
  const connectMetamask = async () => {
    metamaskConnect().then((res) => {
      setIsToggled(false);
      localStorage.setItem("provider", "metamask");
      if (res.newUser) {
        setIsModalToggled(true);
        setReturnedAddress(res.address);
        setReturnedProvider("metamask");
        return;
      }
      setProvider("metamask");
      setAddress(res.address);
    });
  };
  const connectBurner = async () => {
    burnerWallet().then((res) => {
      setIsToggled(false);
      if (res.newUser) {
        setIsModalToggled(true);
        setReturnedAddress(res.address);
      }
    });
  };
  const connectWallet = () => {
    walletConnect().then((res) => {
      localStorage.setItem("provider", "walletConnect");
      setIsToggled(false);
      if (res.newUser) {
        setIsModalToggled(true);
        setReturnedAddress(res.address);
        setReturnedProvider("walletConnect");
        return;
      }
      setAddress(res.address);
      setProvider("walletConnect");
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
        backdrop="static"
        className="select-modal"
      >
        <ModalBody>
          <img src={LogoRound} alt="" className="img-fluid mx-auto d-block" />
          <h2 className="mb-3 text-center">Connect your wallet</h2>
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
                onClick={connectWallet}
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
            <Row>
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
                <p className="mb-0">Burner wallet</p>
                <p className="caption text-grey">For testing only</p>
              </Col>
              <Col className="invisible"></Col>
            </Row>
          </Container>
        </ModalBody>
      </Modal>
      <UsernameModal
        isToggled={isModalToggled}
        address={address}
        provider={provider}
        setIsToggled={setIsModalToggled}
      />
    </div>
  );
}
