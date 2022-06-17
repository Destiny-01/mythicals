import React from "react";
import { Col, Container, Row } from "reactstrap";
import Avatar1 from "../../assets/Avatar1.png";
import NavbarWrapper from "../../components/NavbarWrapper";
import CellCard from "../../components/grid/CellCard";
import { eggsArray } from "../../data/eggsArray";

export default function Keyboard({ onChar, onDelete, onEnter }) {
  const onClick = (id) => {
    if (id === "submit") {
      onEnter();
    } else if (id === "delete") {
      onDelete();
    } else {
      onChar(id);
    }
  };
  return (
    <Container className="keyboard mb-3 position-absolute bottom-0 start-50 translate-middle-x">
      <Row className="row-cols-auto mb-2 justify-content-center g-2">
        {eggsArray.slice(0, 7).map((egg) => {
          return (
            <Col key={egg.id}>
              <CellCard id={egg.id} state="dead" onClick={onClick} />
            </Col>
          );
        })}
      </Row>
      <Row className="row-cols-auto justify-content-center g-2">
        <Col>
          <CellCard id="submit" state="default" onClick={onClick} />
        </Col>

        {eggsArray.slice(7, 11).map((egg) => {
          return (
            <Col key={egg.id}>
              <CellCard id={egg.id} state="injured" onClick={onClick} />
            </Col>
          );
        })}
        <Col>
          <CellCard id="delete" state="default" onClick={onClick} />
        </Col>
      </Row>
    </Container>
  );
}
