import { useEffect, useState } from "react";

const Timer = ({ setTimeOut, questionNumber, answersLocked, quizStarted, isPaused }) => {
  const [timer, setTimer] = useState(60);

  // Reset timer when question changes
  useEffect(() => {
    setTimer(60);
  }, [questionNumber]);

  // Handle timer countdown
  useEffect(() => {
    if (!quizStarted || isPaused || answersLocked) return;
    
    if (timer === 0) {
      setTimeOut(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, setTimeOut, quizStarted, isPaused, answersLocked]);

  return quizStarted ? <div className="timer">{timer}</div> : null;
};

export default Timer;