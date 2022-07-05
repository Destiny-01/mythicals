import { useState } from "react";
import { Col } from "reactstrap";
import { CompletedRow } from "./CompletedRow";
import { CurrentRow } from "./CurrentRow";
import { EmptyRow } from "./EmptyRow";
import { SolutionRow } from "./SolutionRow";
import Avatar1 from "../../assets/Avatar1.png";
import Avatar2 from "../../assets/Avatar2.png";
import { getPlayer } from "../../utils/contract";

export const Grid = ({
  player,
  guesses,
  currentGuess,
  solution,
  status,
  ready,
}) => {
  const [record, setRecord] = useState(null);

  const empties =
    guesses.length > 2
      ? Array.from(Array(1))
      : Array.from(Array(3 - guesses.length));

  getPlayer().then((el) => setRecord(el));

  return (
    <Col>
      <div className="">
        <div className="d-flex align-center">
          <div className="">
            <img
              src={player === "Opponent" ? Avatar1 : Avatar2}
              alt=""
              className=" me-2"
            />
          </div>
          <div className="">
            <p className="mb-0 d-line">
              {ready ? (
                player + " Guesses"
              ) : (
                <span className="fst-italic">waiting for opponent</span>
              )}
            </p>
            <p className="caption">
              {record && record.wins.toString()}wins{" "}
              {record && record.losses.toString()}losses
            </p>
          </div>
        </div>
        <div className="guesscard">
          <SolutionRow solution={solution} />
          <div className="guesses">
            {guesses.map((guess, i) => (
              <CompletedRow
                key={i}
                guess={guess}
                status={status && status[i]}
              />
            ))}
            <CurrentRow guess={currentGuess} />
            {empties.map((_, i) => (
              <EmptyRow key={i} />
            ))}
          </div>
        </div>
      </div>
    </Col>
  );
};
