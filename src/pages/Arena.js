import React from "react";
import { Col, Container, Row } from "reactstrap";
import egg1 from "../assets/eggs/egg1.svg";
import egg2 from "../assets/eggs/egg2.svg";
import eggDefault from "../assets/eggs/eggDefault.svg";
import Avatar1 from "../assets/Avatar1.png";
import NavbarWrapper from "../components/NavbarWrapper";
import CellCard from "../components/grid/CellCard";
import Keyboard from "../components/grid/Keyboard";

export default function Arena() {
  return (
    <div class="position-relative" style={{ minHeight: "100vh" }}>
      <Container>
        <NavbarWrapper />
        <Row className=" mx-md-5 mt-3">
          <Col>
            <div className="">
              <div className="d-flex align-center">
                <div className="">
                  <img src={Avatar1} alt="" className=" me-2" />
                </div>
                <div className="">
                  <p className="mb-0 d-line">Velloga </p>
                  <p className="caption">5Wins 0Losses</p>
                </div>
              </div>

              <Row className="row-cols-auto mb-2 g-2">
                <CellCard id={1} state="dead" />
                <CellCard id={1} state="dead" />
                {/* <CellCard id={1} /> */}

                <Col>
                  <img src={egg1} alt="" />
                </Col>
                <Col>
                  <img src={eggDefault} alt="" />
                </Col>
                <Col>
                  <img src={egg1} alt="" />
                </Col>
              </Row>
              <hr />
              <div className="guesses">
                <Row className="row-cols-auto mb-2 g-2">
                  <Col>
                    <img src={egg1} alt="" />
                  </Col>
                  <Col>
                    <img src={egg2} alt="" />
                  </Col>
                  <Col>
                    <img src={egg1} alt="" />
                  </Col>
                  <Col>
                    <img src={eggDefault} alt="" />
                  </Col>
                  <Col>
                    <img src={egg1} alt="" />
                  </Col>
                </Row>
                <Row className="row-cols-auto mb-2 g-2">
                  <Col>
                    <img src={egg1} alt="" />
                  </Col>
                  <Col>
                    <img src={egg2} alt="" />
                  </Col>
                  <Col>
                    <img src={egg1} alt="" />
                  </Col>
                  <Col>
                    <img src={eggDefault} alt="" />
                  </Col>
                  <Col>
                    <img src={egg1} alt="" />
                  </Col>
                </Row>
                <Row className="row-cols-auto mb-2 g-2">
                  <Col>
                    <img src={egg1} alt="" />
                  </Col>
                  <Col>
                    <img src={egg2} alt="" />
                  </Col>
                  <Col>
                    <img src={egg1} alt="" />
                  </Col>
                  <Col>
                    <img src={eggDefault} alt="" />
                  </Col>
                  <Col>
                    <img src={egg1} alt="" />
                  </Col>
                </Row>
                <Row className="row-cols-auto mb-2 g-2">
                  <Col>
                    <img src={egg1} alt="" />
                  </Col>
                  <Col>
                    <img src={egg2} alt="" />
                  </Col>
                  <Col>
                    <img src={egg1} alt="" />
                  </Col>
                  <Col>
                    <img src={eggDefault} alt="" />
                  </Col>
                  <Col>
                    <img src={egg1} alt="" />
                  </Col>
                </Row>{" "}
              </div>
            </div>
          </Col>
          <Col></Col>
          <Col>
            <div className="">
              <div className="d-flex align-center justify-content-end">
                <div className="text-end">
                  <p className="mb-0 d-line">Velloga </p>
                  <p className="caption">5Wins 0Losses</p>
                </div>
                <div className="">
                  <img src={Avatar1} alt="" className=" ms-2" />
                </div>
              </div>

              <Row className="row-cols-auto mb-2 g-2">
                <Col>
                  <img src={egg1} alt="" />
                </Col>
                <Col>
                  <img src={egg2} alt="" />
                </Col>
                <Col>
                  <img src={egg1} alt="" />
                </Col>
                <Col>
                  <img src={eggDefault} alt="" />
                </Col>
                <Col>
                  <img src={egg1} alt="" />
                </Col>
              </Row>
              <hr />
              <Row className="row-cols-auto mb-2 g-2">
                <Col>
                  <img src={egg1} alt="" />
                </Col>
                <Col>
                  <img src={egg2} alt="" />
                </Col>
                <Col>
                  <img src={egg1} alt="" />
                </Col>
                <Col>
                  <img src={eggDefault} alt="" />
                </Col>
                <Col>
                  <img src={egg1} alt="" />
                </Col>
              </Row>
              <Row className="row-cols-auto mb-2 g-2">
                <Col>
                  <img src={egg1} alt="" />
                </Col>
                <Col>
                  <img src={egg2} alt="" />
                </Col>
                <Col>
                  <img src={egg1} alt="" />
                </Col>
                <Col>
                  <img src={eggDefault} alt="" />
                </Col>
                <Col>
                  <img src={egg1} alt="" />
                </Col>
              </Row>

              <Row className="row-cols-auto mb-2 g-2">
                <Col>
                  <img src={egg1} alt="" />
                </Col>
                <Col>
                  <img src={egg2} alt="" />
                </Col>
                <Col>
                  <img src={egg1} alt="" />
                </Col>
                <Col>
                  <img src={eggDefault} alt="" />
                </Col>
                <Col>
                  <img src={egg1} alt="" />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        <Keyboard />
      </Container>
    </div>
  );
}
