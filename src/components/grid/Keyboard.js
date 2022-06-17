import React from "react";
import { Col, Container, Row } from "reactstrap";
import enterButton from "../../assets/eggActions/enter.svg";
import deleteButton from "../../assets/eggActions/delete.svg";
import Avatar1 from "../../assets/Avatar1.png";
import NavbarWrapper from "../../components/NavbarWrapper";
import CellCard from "../../components/grid/CellCard";
import { eggsArray } from "../../data/eggsArray";

export default function Keyboard() {
  return (
    <Container className="keyboard mb-3 position-absolute bottom-0 start-50 translate-middle-x">
      <Row className="row-cols-auto mb-2 justify-content-center g-2">
        {eggsArray.slice(0, 7).map((egg) => {
          return (
            <Col key={egg.id}>
              <CellCard id={egg.id} state="dead" />
            </Col>
          );
        })}
      </Row>
      <Row className="row-cols-auto justify-content-center g-2">
        <Col>
          <img src={enterButton} alt="Enter Button" />
        </Col>

        {eggsArray.slice(7, 11).map((egg) => {
          return (
            <Col key={egg.id}>
              <CellCard id={egg.id} state="injured" />
            </Col>
          );
        })}
        <Col>
          <img src={deleteButton} alt="Delete Button" />
        </Col>
      </Row>
    </Container>
  );
}
