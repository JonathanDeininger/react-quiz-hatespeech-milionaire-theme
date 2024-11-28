import React, { useEffect, useState } from "react";

const Timer = ({ setTimeOut, questionNumber, quizStarted, isPaused }) => { // Neuer Prop
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    if (!quizStarted || isPaused) return; // Timer anhalten, wenn isPaused true ist
    if (timer === 0) return setTimeOut(true);
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, setTimeOut, quizStarted, isPaused]); // isPaused zur Abhängigkeit hinzufügen

  useEffect(() => {
    setTimer(60);
  }, [questionNumber]);

  return quizStarted ? timer : null; // Nur anzeigen, wenn Quiz gestartet ist
};

export default Timer;
