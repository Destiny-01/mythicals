import { Row } from "reactstrap";
import { Cell } from "./Cell";

export const CurrentRow = ({ guess }) => {
  const splitGuess = guess.split("");
  const emptyCells = Array.from(Array(5 - splitGuess.length));

  return (
    <Row className="row-cols-auto mb-2 g-2">
      {splitGuess.map((letter, i) => (
        <Cell key={i} id={letter} />
      ))}
      {emptyCells.map((_, i) => (
        <Cell key={i} state="default" />
      ))}
    </Row>
  );
};
