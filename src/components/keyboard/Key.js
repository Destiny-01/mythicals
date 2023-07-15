import React, { Fragment } from "react";
import enterButton from "../../assets/eggActions/enter.svg";
import deleteButton from "../../assets/eggActions/delete.svg";
import eggDefault from "../../assets/eggs/eggDefault.svg";
import eggNull from "../../assets/eggs/eggNull.png";
import { Col } from "reactstrap";

export function Key({ id, image, onClick, currentGuess, balance }) {
  const guessArr = String(currentGuess)
    .split("")
    .map((guess) => {
      return Number(guess);
    });

  const isClicked = (id) => {
    return guessArr.some((guess) => guess === id);
  };
  return (
    <Col className="key position-relative">
      {id && id === "delete" ? (
        <img src={deleteButton} alt="" onClick={() => onClick(id)} />
      ) : id && id === "submit" ? (
        <img src={enterButton} alt="" onClick={() => onClick(id)} />
      ) : id === "null" ? (
        <img src={eggNull} alt="eggNull" style={{ cursor: "not-allowed" }} />
      ) : isClicked(id) ? (
        <img src={eggDefault} alt="" style={{ cursor: "not-allowed" }} />
      ) : (
        <Fragment>
          <img src={image} alt="" onClick={() => onClick(id)} />
          {window.location.pathname === "/select-egg" && (
            <div className="balance">
              <p>{balance}</p>
            </div>
          )}
        </Fragment>
      )}
    </Col>
  );
}
