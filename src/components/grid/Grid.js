import { useState } from "react";
import { Col } from "reactstrap";
import { CompletedRow } from "./CompletedRow";
import { CurrentRow } from "./CurrentRow";
import { EmptyRow } from "./EmptyRow";
import { SolutionRow } from "./SolutionRow";
import Avatar1 from "../../assets/Avatar1.png";

export const Grid = ({
  player,
  guesses,
  currentGuess,
  solution,
  isTurn,
  status,
}) => {
  // const [isGameStarted, setIsGameStarted] = useState(false);
  // const [isGuessing, setIsGuessing] = useState(false);
  // const [isError, setIsError] = useState(false);

  const empties =
    guesses.length > 2
      ? Array.from(Array(1))
      : Array.from(Array(3 - guesses.length));

  //  guesses.length < 5 ? Array.from(Array(5 - guesses.length)) : [];
  console.log(empties, guesses);
  return (
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

        <SolutionRow />
        <div className="guesses">
          {guesses.map((guess, i) => (
            <CompletedRow key={i} guess={guess} status={status && status[i]} />
          ))}
          <CurrentRow guess={currentGuess} />
          {empties.map((_, i) => (
            <EmptyRow key={i} />
          ))}
        </div>
      </div>
    </Col>
  );
};
