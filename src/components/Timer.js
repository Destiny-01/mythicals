import { CountdownCircleTimer } from "react-countdown-circle-timer";

const renderTime = ({ remainingTime }) => {
  if (remainingTime === 0) {
    return <h4>Time up</h4>;
  }
  if (remainingTime < 4) {
    return (
      <div className="timer">
        <div className="text">Hurry Up</div>
        <div className="value">{remainingTime}</div>
        <div className="text">seconds left</div>
      </div>
    );
  }

  return (
    <div className="timer">
      <div className="text">You have</div>
      <div className="value">{remainingTime}</div>
      <div className="text">to guess</div>
    </div>
  );
};

const Timer = ({ duration, isPlaying, timerKey, onComplete }) => {
  return (
    <div className="mx-auto" style={{ width: "120px" }}>
      <CountdownCircleTimer
        isPlaying={isPlaying}
        duration={duration}
        initialRemainingTime={duration}
        size={120}
        trailColor="#191D30"
        key={timerKey}
        colors="#AD4123"
        onComplete={onComplete}
      >
        {renderTime}
      </CountdownCircleTimer>
    </div>
  );
};

export default Timer;
