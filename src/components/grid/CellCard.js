import React from "react";
import deadEgg from "../../assets/eggState/dead.svg";
import enterButton from "../../assets/eggActions/enter.svg";
import deleteButton from "../../assets/eggActions/delete.svg";
import injuredEgg from "../../assets/eggState/injured.svg";
import { eggsArray } from "../../data/eggsArray";

export default function CellCard({ id, state, onClick }) {
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
    <>
      {id === "delete" ? (
        <img src={deleteButton} alt="" onClick={onClick(id)} />
      ) : id === "enter" ? (
        <img src={enterButton} alt="" onClick={onClick(id)} />
      ) : (
        <div
          className="position-relative cell"
          style={{ width: "56px" }}
          onClick={onClick(id)}
        >
          <img
            src={eggsArray[id - 1].image}
            class="position-absolte tp-50 strt-50 transate-middle"
            alt=""
          />
          {state && state !== "default" && (
            <img
              src={eggsState.find((el) => el.status === state).image}
              class="position-absolute top-50 start-50 translate-middle"
              alt=""
            />
          )}
        </div>
      )}
    </>
  );
}
