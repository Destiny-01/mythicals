import React from "react";
import deadEgg from "../../assets/eggState/dead.svg";
import { eggsArray } from "../../data/eggsArray";
import eggDefault from "../../assets/eggs/eggDefault.svg";
import eggUnknown from "../../assets/eggs/eggUnknown.png";
import { Col } from "reactstrap";

export function Cell({ id, state }) {
  const eggsState = [
    {
      status: "dead",
      image: deadEgg,
    },
  ];

  return (
    <Col className="position-relative cell">
      {state === "unknown" ? (
        <img src={eggUnknown} alt="" />
      ) : state !== "default" ? (
        <img src={eggsArray[id].image} alt="" />
      ) : (
        <img src={eggDefault} alt="" />
      )}
      {state &&
        state !== "default" &&
        state !== "safe" &&
        state !== "unknown" && (
          <img
            src={eggsState.find((el) => el.status === state).image}
            className="position-absolute top-50 start-50 translate-middle"
            alt=""
          />
        )}
    </Col>
  );
}
