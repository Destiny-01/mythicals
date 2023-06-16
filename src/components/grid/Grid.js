import { Col } from "reactstrap";
import { CompletedRow } from "./CompletedRow";
import { CurrentRow } from "./CurrentRow";
import { EmptyRow } from "./EmptyRow";
import { SolutionRow } from "./SolutionRow";
import Avatar1 from "../../assets/Avatar1.png";
import Avatar2 from "../../assets/Avatar2.png";
import { Fragment } from "react";

export const Grid = ({
  player,
  guesses,
  currentGuess,
  solution,
  status,
  ready,
}) => {
  const empties =
    guesses.length > 2
      ? Array.from(Array(1))
      : Array.from(Array(3 - guesses.length));

  return (
    <Col>
      <div className="guess">
        <div className="d-flex align-center">
          <div className="">
            <img
              src={player && player.avatar === 1 ? Avatar1 : Avatar2}
              alt=""
              className=" me-2"
            />
          </div>
          <div className="">
            <p className="mb-0 d-line">
              {ready ? (
                (player &&
                  player.address !== window.ethereum?.selectedAddress) ||
                sessionStorage.getItem("address") ? (
                  <Fragment>
                    {`Your Guesses (${player?.username || "player"})`}
                  </Fragment>
                ) : (
                  <Fragment>
                    {`Opponent Guesses (${player?.username || "player"})`}
                  </Fragment>
                )
              ) : (
                <span className="fst-italic">waiting for opponent</span>
              )}
            </p>
            <p className="caption">
              {`${player ? player.wins : "0"} wins ${
                player ? player.losses : "0"
              } losses`}
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
                status={status && status[i].split(" ")}
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
