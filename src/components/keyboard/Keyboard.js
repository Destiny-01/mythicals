import React from "react";
import { Key } from "./Key";
import { Container, Row } from "reactstrap";

import { eggsArray } from "../../data/eggsArray";

export default function Keyboard({ onChar, onDelete, onEnter, currentGuess }) {
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
            <Key
              key={egg.id}
              id={egg.id}
              state="dead"
              image={egg.image}
              onClick={onClick}
              currentGuess={currentGuess}
            />
          );
        })}
      </Row>
      <Row className="row-cols-auto justify-content-center g-2">
        <Key id="submit" state="default" onClick={onClick} />
        <Key id="submit" state="default" onClick={onClick} />

        {eggsArray.slice(7, 10).map((egg) => {
          return (
            <Key
              key={egg.id}
              id={egg.id}
              state="injured"
              onClick={onClick}
              image={egg.image}
              currentGuess={currentGuess}
            />
          );
        })}

        <Key id="delete" state="default" onClick={onClick} />
      </Row>
    </Container>
  );
}
