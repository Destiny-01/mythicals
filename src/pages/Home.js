import { useState } from "react";
import LogoFull from "../assets/LogoFull.png";
import NavbarWrapper from "../components/NavbarWrapper";
import { Container, Button } from "reactstrap";
import HowToPlay from "../components/modals/HowToPlay";
import SelectWallet from "../components/modals/SelectWallet";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

function Home() {
  const { address } = useAppContext();
  const navigate = useNavigate();
  const [showModal, shouldShowModal] = useState(false);

  const handleClick = () => {
    if (!address) {
      shouldShowModal(true);
      return;
    }
    navigate("/game");
  };

  return (
    <Container>
      <NavbarWrapper />

      <div className="text-center mt-5 ">
        <img
          src={LogoFull}
          alt=""
          className="img-fluid mx-auto d-block mb-3 text-center"
        />
        <h1 className="text-5xl font-bold mb-2">Hatch, Battle, And Conquer!</h1>
        <h4 className="mb-3">
          Command your dragon eggs in the ultimate PvP showdown of Myth Arena,{" "}
          <br />
          where strategy meets the fiery might of mythical creatures.
        </h4>
        <div>
          <Button className="me-2" onClick={handleClick}>
            Start playing
          </Button>
          <HowToPlay />
          {showModal && <SelectWallet button={true} />}
        </div>
      </div>
    </Container>
  );
}

export default Home;
