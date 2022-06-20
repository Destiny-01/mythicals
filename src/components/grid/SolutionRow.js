import { Col, Row } from "reactstrap";
import egg1 from "../../assets/eggs/egg1.svg";
import { Cell } from "./Cell";

export const SolutionRow = ({ solution }) => {
  const solutionArr = String(solution)
    .split("")
    .map((solution) => {
      return Number(solution);
    });
  return (
    <div className="">
      <Row className="row-cols-auto mb-2 g-2">
        {solutionArr.map((e, i) => {
          return <Cell key={i} id={e} />;
        })}
      </Row>
      <hr />
    </div>
  );
};
