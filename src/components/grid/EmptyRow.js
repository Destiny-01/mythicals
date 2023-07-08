import { Row } from "reactstrap";
import { Cell } from "./Cell";

export const EmptyRow = () => {
  const emptyCells = Array.from(Array(5));

  return (
    <Row>
      {emptyCells.map((_, i) => (
        <Cell key={i} state="default" />
      ))}
    </Row>
  );
};
