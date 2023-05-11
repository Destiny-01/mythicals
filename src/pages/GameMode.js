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
import Game1 from "../assets/Game1.png";
import Game2 from "../assets/Game2.png";
import Game3 from "../assets/Game3.png";
import SelectGame from "../components/modals/SelectGame";

export default function GameMode() {
  return (
    <div>
      <Container>
        <NavbarWrapper />
        <div className=" mt-1 mb-3">
          <h2 className="text-center mb-5">Select game mode</h2>

          <Row className="px-md-5 mx-md-5 mb-3">
            <Col md="4" className="bg-blue">
              <Card className="gamecard 1">
                <CardImg alt="Card image cap" src={Game1} top width="100%" />
                <CardBody>
                  <CardTitle tag="p" className="mb-0">
                    Single player
                  </CardTitle>
                  <CardText className="caption">In game trophy</CardText>
                </CardBody>
              </Card>
            </Col>
            <Col md="4" className="bg-blue">
              <Card className="gamecard active">
                <CardImg alt="Card image cap" src={Game2} top width="100%" />
                <CardBody>
                  <CardTitle tag="p" className="mb-0">
                    Multiplayer
                  </CardTitle>
                  <CardText className="caption">1 Free NFT</CardText>
                </CardBody>
              </Card>
            </Col>
            <Col md="4" className="bg-blue">
              <Card className="gamecard">
                <CardImg alt="Card image cap" src={Game3} top width="100%" />
                <CardBody>
                  <CardTitle tag="p" className="mb-0">
                    Tournament
                  </CardTitle>
                  <CardText className="caption">$2000 in cash</CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <div className="text-center">
            <p className="mb-3">
              Vivamus suscipit tortor eget felis porttitor volutpat. Donec{" "}
              rutrum congue leo eget <br /> malesuada. Proin eget tortor risus.
            </p>
            <SelectGame />
          </div>
        </div>{" "}
      </Container>
    </div>
  );
}
