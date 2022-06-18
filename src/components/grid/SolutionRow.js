import { Col, Row } from "reactstrap";
import egg1 from "../../assets/eggs/egg1.svg";
import { Cell } from "./Cell";

export const SolutionRow = ({ guess, status }) => {
  const arr = [2, 3, 4, 7, 9];
  return (
    <div className="">
      <Row className="row-cols-auto mb-2 g-2">
        {arr.map((e, i) => {
          return <Cell key={i} id={e} />;
        })}
      </Row>
      <hr />
    </div>
  );
};
