import LogoFull from "../assets/LogoFull.svg";
import NavbarWrapper from "../components/NavbarWrapper";
import { Container, Button } from "reactstrap";
import HowToPlay from "../components/modals/HowToPlay";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className=" bg-overlay">
      <Container>
        <NavbarWrapper />

        <div className="text-center mt-5 ">
          <img
            src={LogoFull}
            alt=""
            className="img-fluid mx-auto d-block mb-3 text-center"
          />
          <h1 className="text-5xl font-display font-bold mb-2">
            KILL THEIR PET BEFORE <br />
            THEY KILL YOURS
          </h1>
          <h4 className="mb-3">
            Find and kill opponent’s pet ceatures in our fun online PVP game and
            earn tokes and <br />
            rewards when you win big games
          </h4>
          <div>
            <Link to="/game">
              <Button className="me-2">Start playing</Button>
            </Link>
            <HowToPlay />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Home;
