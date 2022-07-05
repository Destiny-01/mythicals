import React from "react";
import deadEgg from "../../assets/eggState/dead.svg";
import injuredEgg from "../../assets/eggState/injured.svg";
import { eggsArray } from "../../data/eggsArray";
import eggDefault from "../../assets/eggs/eggDefault.svg";
import eggUnknown from "../../assets/eggs/eggUnknown.svg";
import { Col } from "reactstrap";

export function Cell({ id, state }) {
  const eggsState = [
    {
      status: "dead",
      image: deadEgg,
    },
    {
      status: "injured",
      image: injuredEgg,
    },
  ];

  return (
    <Col className="position-relative cell" style={{ width: "56px" }}>
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
            class="position-absolute top-50 start-50 translate-middle"
            alt=""
          />
        )}
    </Col>
  );
}
