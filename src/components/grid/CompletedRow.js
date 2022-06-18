import { Row } from "reactstrap";
import { Cell } from "./Cell";

export const CompletedRow = ({ guess, status }) => {
  return (
    <Row className="row-cols-auto mb-2 g-2">
      {guess.split("").map((letter, i) => {
        return <Cell key={i} id={letter} state={status && status[i]} />;
      })}
    </Row>
  );
};
