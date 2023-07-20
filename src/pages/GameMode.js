import React from "react";
import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Container,
  Row,
} from "reactstrap";
import NavbarWrapper from "../components/NavbarWrapper";
import Game1 from "../assets/gameMode/Game1.png";
import Game2 from "../assets/gameMode/Game2.png";
import Game3 from "../assets/gameMode/Game3.png";
import SelectGame from "../components/modals/SelectGame";
import LogoRound from "../assets/LogoRoundThick.png";
import Logo from "../assets/Logo.png";
import LogoDefault from "../assets/LogoDefault.png";

export default function GameMode({ socket }) {
  return (
    <Container>
      <NavbarWrapper />
      <div className="mt-1 mb-3">
        <h2 className="text-center my-5">Choose a game mode</h2>

        <Row className="px-md-5 mx-md-5 mb-4">
          <Col md="4" className="bg-blue">
            <Card className="gamecard 1">
              <CardImg alt="Card image cap" src={Game1} top width="100%" />
              <div style={{ position: "relative" }}>
                <div className="card-egg">
                  <img src={Logo} width={32} alt="" />
                </div>
                <CardBody>
                  <img
                    src={LogoDefault}
                    alt=""
                    className="game-mode-img img-fluid mb-3 "
                  />
                  <CardTitle tag="p" className="fw-bold mb-0">
                    Single player
                  </CardTitle>
                  <CardText className="caption">
                    <img src={LogoRound} width={16} className="me-1" alt="" />
                    Up to 50 $MTYH in reward
                  </CardText>
                </CardBody>
              </div>
            </Card>
          </Col>
          <Col md="4" className="bg-blue">
            <Card className="gamecard active">
              <CardImg alt="Card image cap" src={Game2} top width="100%" />
              <div style={{ position: "relative" }}>
                <div className="card-egg">
                  <img src={Logo} width={32} alt="" />
                </div>
                <CardBody>
                  <img
                    src={LogoRound}
                    alt=""
                    className="game-mode-img img-fluid mb-3 "
                  />
                  <CardTitle tag="p" className="fw-bold mb-0">
                    Multiplayer
                  </CardTitle>
                  <CardText className="caption">
                    <img src={LogoRound} width={16} className="me-1" alt="" />
                    Up to 100 $MTYH in reward
                  </CardText>
                </CardBody>
              </div>
            </Card>
          </Col>
          <Col md="4" className="bg-blue">
            <Card className="gamecard">
              <CardImg alt="Card image cap" src={Game3} top width="100%" />
              <div style={{ position: "relative" }}>
                <div className="card-egg">
                  <img src={Logo} width={32} alt="" />
                </div>
                <CardBody>
                  <img
                    src={LogoDefault}
                    alt=""
                    className="game-mode-img img-fluid mb-3 "
                  />
                  <CardTitle tag="p" className="fw-bold mb-0">
                    Tournament
                  </CardTitle>
                  <CardText className="caption">
                    <img src={LogoRound} width={16} className="me-1" alt="" />
                    Up to 500 $MTYH in reward
                  </CardText>
                </CardBody>
              </div>
            </Card>
          </Col>
        </Row>

        <div className="text-center">
          <p className="mb-3 game-mode-text">
            Unleash your dragon's fury in the exhilarating multiplayer mode of
            Myth Arena! Challenge players from around the world in epic battles,
            rise through the ranks, and claim legendary rewards that ignite your
            victory.
          </p>
          <SelectGame socket={socket} />
        </div>
      </div>{" "}
    </Container>
  );
}
