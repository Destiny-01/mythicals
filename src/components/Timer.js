import { CountdownCircleTimer } from "react-countdown-circle-timer";

const renderTime = ({ remainingTime }) => {
  if (remainingTime < 6) {
    return (
      <div className="timer red">
        <h1 className="text">{remainingTime}</h1>
      </div>
    );
  }

  return (
    <div className="timer">
      <h1 className="text">{remainingTime}</h1>
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
        colorsTime={[duration, 5]}
        colors={["#AD4123", "#F40101"]}
        onComplete={onComplete}
      >
        {renderTime || 0}
      </CountdownCircleTimer>
    </div>
  );
};

export default Timer;
