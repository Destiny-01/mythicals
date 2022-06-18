import React from "react";
import enterButton from "../../assets/eggActions/enter.svg";
import deleteButton from "../../assets/eggActions/delete.svg";
import { eggsArray } from "../../data/eggsArray";
import { Col } from "reactstrap";

export function Key({ id, image, onClick, currentGuess }) {
  console.log("all", id, currentGuess);
  const guessArr = String(currentGuess)
    .split("")
    .map((guess) => {
      return Number(guess);
    });

  const isClicked = (id) => {
    return guessArr.some((guess) => guess === id);
  };
  console.log(isClicked());
  return (
    <Col onClick={() => onClick(id)}>
      {id && id === "delete" ? (
        <img src={deleteButton} alt="" />
      ) : id && id === "submit" ? (
        <img src={enterButton} alt="" />
      ) : (
        // ) : id && isClicked ? (
        //   <img src={enterButton} alt="" onClick={onClick(id)} />
        // id && console.log("ddd" + id)
        id && <img src={image} alt="" />
      )}
    </Col>
  );
}
