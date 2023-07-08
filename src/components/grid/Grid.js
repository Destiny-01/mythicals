import { useEffect, useRef } from "react";
import { Col } from "reactstrap";
import { CompletedRow } from "./CompletedRow";
import { CurrentRow } from "./CurrentRow";
import { EmptyRow } from "./EmptyRow";
import { SolutionRow } from "./SolutionRow";
import Avatar1 from "../../assets/Avatar1.png";
import Avatar2 from "../../assets/Avatar2.png";
import Injured from "../../assets/eggState/injured.svg";

export const Grid = ({
  player,
  address,
  guesses,
  currentGuess,
  solution,
  status,
  ready,
  injuredStatus,
}) => {
  const guessesRef = useRef();
  const asideRef = useRef();
  const empties =
    guesses.length > 2
      ? Array.from(Array(1))
      : Array.from(Array(3 - guesses.length));

  useEffect(() => {
    guessesRef.current.addEventListener("scroll", () => {
      asideRef.current.scrollTop = guessesRef.current.scrollTop;
    });
  }, []);

  return (
    <Col>
      <div className="guess">
        <div className={`d-flex`}>
          <div>
            <img
              src={player && player.avatar === 1 ? Avatar1 : Avatar2}
              alt=""
              className="mt-1 me-2"
            />
          </div>
          <div>
            <p className="mb-0">
              {ready ? (
                player?.username || "player"
              ) : (
                <span className="fst-italic">waiting for opponent</span>
              )}
            </p>
            <p className="caption">
              {player?.address !== address
                ? "Guess your opponent eggs"
                : "These are your eggs"}
            </p>
          </div>
        </div>
        <div className="guesscard">
          <SolutionRow solution={solution} />
          <div className="position-relative">
            <div className="guesses text-center px-3" ref={guessesRef}>
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
            <div className="aside" ref={asideRef}>
              {[...injuredStatus, null, null].map((status, i) => (
                <div
                  key={i}
                  className={`d-flex align-items-center ${
                    !status && "invisible"
                  }`}
                >
                  <h2 className="mb-0">{status}</h2>
                  <img src={Injured} alt="" className="ms-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Col>
  );
};
