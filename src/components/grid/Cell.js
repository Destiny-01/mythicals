import React from "react";
import deadEgg from "../../assets/eggState/dead.svg";
import injuredEgg from "../../assets/eggState/injured.svg";
import { eggsArray } from "../../data/eggsArray";

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
    <div className="position-relative cell" style={{ width: "56px" }}>
      {id && <img src={eggsArray[id - 1].image} alt="" />}
      {state && state !== "default" && (
        <img
          src={eggsState.find((el) => el.status === state).image}
          class="position-absolute top-50 start-50 translate-middle"
          alt=""
        />
      )}
    </div>
  );
}
