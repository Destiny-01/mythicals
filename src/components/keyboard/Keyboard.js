import React from "react";
import { Key } from "./Key";
import { Container, Row } from "reactstrap";
import { eggsArray } from "../../data/eggsArray";
import { Link } from "react-router-dom";

export default function Keyboard({
  onChar,
  onDelete,
  guesses,
  onEnter,
  currentGuess,
  isTurn,
  isGameEnded,
  isGameStarted,
}) {
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
    <Container className="keyboard  mb-3 position-absolute bottom-0 start-50 translate-middle-x">
      <div
        className={
          !isTurn ||
          isGameEnded ||
          (!isGameStarted && !isGameEnded && guesses !== undefined)
            ? "disabledKey"
            : ""
        }
      >
        <Row className="row-cols-auto mb-2  justify-content-center g-2">
          {eggsArray.slice(0, 3).map((egg) => {
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
          <Key id="null" state="null" onClick={onClick} />
          {eggsArray.slice(3, 6).map((egg) => {
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

          {eggsArray.slice(6, 10).map((egg) => {
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
      </div>
      {!isGameStarted && !isGameEnded && guesses !== undefined ? (
        <Row className="text-center w-100 position-absolute top-50 start-50 translate-middle ">
          <p className="mb-0">Waiting for your opponent to join</p>
          <p className="caption">
            Please wait for your opponent to join the game. Hope you've shared
            him the code
          </p>
        </Row>
      ) : (
        !isTurn &&
        !isGameEnded && (
          <Row className="text-center w-100 position-absolute top-50 start-50 translate-middle ">
            <p className="mb-0">It's opponent's turn to play</p>
            <p className="caption">
              Please wait for your opponent to finish guessing
            </p>
          </Row>
        )
      )}
      {isGameEnded && (
        <Row className="text-center position-absolute top-50 start-50 translate-middle ">
          <p className="mb-0">Game over</p>
          <p className="caption">
            Please{" "}
            <Link to="/game" className="text-white text-underline">
              create a new game{" "}
            </Link>{" "}
            to play again
          </p>
        </Row>
      )}
    </Container>
  );
}
