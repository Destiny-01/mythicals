import { Row } from "reactstrap";
import { Cell } from "./Cell";

export const CurrentRow = ({ guess, select }) => {
  const splitGuess = guess.split("");
  const emptyCells = Array.from(Array(5 - splitGuess.length));

  return (
    <Row
      className={select && "row-cols-auto gap-2 pt-3 justify-content-center"}
    >
      {splitGuess.map((letter, i) => (
        <Cell key={i} id={letter} select />
      ))}
      {emptyCells.map((_, i) => (
        <Cell key={i} state="default" />
      ))}
    </Row>
  );
};
