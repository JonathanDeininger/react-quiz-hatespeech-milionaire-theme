import { useEffect, useState } from "react";

const Timer = ({ setTimeOut, questionNumber, answersLocked, quizStarted, isPaused }) => {
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    if (!quizStarted || isPaused) return; // Pause timer if not started or paused
    if (timer === 0) {
      setTimeOut(true);
      return;
    }
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, setTimeOut, quizStarted, isPaused]);

  useEffect(() => {
    setTimer(60);
  }, [questionNumber]);

  return quizStarted ? <div className="timer">{timer}</div> : null; // Render timer visually
};

export default Timer;
