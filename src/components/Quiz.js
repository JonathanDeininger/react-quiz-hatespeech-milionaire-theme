import React, { useState, useEffect } from "react";

const Quiz = ({
  questions,
  questionNumber,
  setQuestionNumber,
  setTimeOut,
  handleBecomeMillionaire,
  quizStarted,
  setQuizStarted,
  setShowExplanationModal, // Bestehende Prop
  setExplanation, // Neue Prop
  answersLocked, // Receive from props
  setAnswersLocked, // Receive from props
}) => {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // Update the current question when the question number changes
  useEffect(() => {
    setQuestion(questions[questionNumber - 1]);
  }, [questions, questionNumber]);


  // Call handleBecomeMillionaire function when becoming a millionaire
  useEffect(() => {
    if (questionNumber > 15) {
      handleBecomeMillionaire();
    }
  }, [questionNumber, handleBecomeMillionaire]);

  // Handles the click for answers
  const handleClick = (item) => {
    if (!answersLocked) {
      setSelectedAnswer(item);
    } else {
      console.log("Answers are locked!");
    }
  };

  // Handles the "Lock In Answer" button click
  const handleLockIn = () => {
    if (!selectedAnswer) {
      alert("Sie können keine Antwort sperren, wenn sie nicht ausgewählt ist!");
      return;
    }

    if (!answersLocked) {
      setAnswersLocked(true); // Use the setter from props

      if (selectedAnswer.correct) {
        if (questionNumber === questions.length) {
          // Last question answered correctly
          setExplanation({
            message: "🎉 Glückwunsch!!! Du hast die Millionen Gewonnen!!! 🎉💰💰💰",
            detail: "Vielen Dank fürs Spielen!",
          });
          setShowExplanationModal(true);
          handleBecomeMillionaire(); // Optional: Sets isMillionaire to true
        } else {
          // Correct answer for other questions
          setExplanation({ message: "🎉 Korrekt!", detail: question.explanation });
          setShowExplanationModal(true);
        }
      } else {
        // Incorrect answer
        setExplanation({ message: "Das war falsch:", detail: question.explanation });
        setShowExplanationModal(true);
        setTimeOut(true); // Activate setTimeOut to display "Starte neu!"
      }
    }
  };

  return (
    <div className="quiz-content">
      {!quizStarted ? (
        <div className="start-container">
          <h1>Quiz gegen Hass</h1>

          <div className="spacer"></div>
          <button className="start-button" onClick={() => setQuizStarted(true)}>
            Quiz starten
          </button>
        </div>
      ) : (
        <>
          <div className="question">{question?.question}</div>
          <div className={`answers ${answersLocked ? "answers-locked" : ""}`}>
            {question?.answers.map((item, index) => (
              <button
                key={index}
                className={`${
                  answersLocked
                    ? item === selectedAnswer
                      ? item.correct
                        ? "answer correct"
                        : "answer incorrect"
                      : "answer"
                    : selectedAnswer === item
                    ? "answer active"
                    : "answer"
                }`}
                onClick={() => !answersLocked && handleClick(item)}
              >
                {item.text}
              </button>
            ))}
          </div>
          <button className="lock-in-button" onClick={handleLockIn}>
            Antwort einloggen
          </button>
        </>
      )}
    </div>
  );
};

export default Quiz;
