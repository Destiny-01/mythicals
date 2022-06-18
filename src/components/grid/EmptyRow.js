import { Row } from "reactstrap";
import { Cell } from "./Cell";

export const EmptyRow = () => {
  const emptyCells = Array.from(Array(5));

  return (
    <Row className="row-cols-auto mb-2 g-2">
      {emptyCells.map((_, i) => (
        <Cell key={i} state="default" />
      ))}
    </Row>
  );
};
