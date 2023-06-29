import { useEffect } from "react";
import { Button, Col, Container, Row } from "reactstrap";
import NavbarWrapper from "../components/NavbarWrapper";
import Banner from "../assets/welcome/Banner.png";
import Chest from "../assets/welcome/Chest.png";
import EggRack from "../assets/welcome/EggRack.png";
import { useAppContext } from "../context/AppContext";
import { initialMint } from "../utils/contract";

export default function Welcome() {
  const { address, setBalance } = useAppContext();
  useEffect(() => {
    if (!address) {
      //   window.location.href = "/";
    }
  }, [address]);

  const handleClaim = async () => {
    const tx = await initialMint();
    if (tx) {
      setBalance(100);
    } else {
      alert("An error occurred. Sure you haven't claimed before?");
    }
  };

  return (
    <Container>
      <NavbarWrapper />
      <div className="welcome">
        <img src={Banner} alt="banner" className="my-5" />
        <Row className="mx-5">
          <Col>
            <img src={Chest} alt="chest" />
            <h2>100</h2>
            <p className="caption">$MYTH tokens</p>
          </Col>
          <Col md="2">
            <h1>+</h1>
          </Col>
          <Col>
            <img src={EggRack} alt="chest" />
            <h2>100</h2>
            <p className="caption">Mythical Eggs</p>
          </Col>
        </Row>
        <Button className="mt-2" onClick={handleClaim}>
          Claim Rewards
        </Button>
      </div>
    </Container>
  );
}
