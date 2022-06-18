import { Col, Row } from "reactstrap";
// import { Cell } from "./Cell";
import egg1 from "../../assets/eggs/egg1.svg";

export const SolutionRow = ({ guess, status }) => {
  return (
    <div className="">
      <Row className="row-cols-auto mb-2 g-2">
        {Array(5).map((e) => {
          return (
            <Col>
              <img src={egg1} alt="" />
            </Col>
          );
        })}
      </Row>
      <hr />
    </div>
  );
};
