import { Row } from "reactstrap";
import { Cell } from "./Cell";

export const SolutionRow = ({ solution }) => {
  const solutionArr = String(solution)
    .split("")
    .map((solution) => {
      return Number(solution);
    });

  const updatedArray =
    solutionArr.length > 0 ? solutionArr : Array.from(Array(5));
  return (
    <Row className="px-2">
      {updatedArray.map((e, i) => {
        return <Cell key={i} id={e} state={e === undefined && "unknown"} />;
      })}
      <hr className="bottom-border" />
    </Row>
  );
};
