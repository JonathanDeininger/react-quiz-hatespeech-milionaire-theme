import React, { useEffect, useState } from "react";
import "./App.css";
import GameWinner from "./components/GameWinner";
import Quiz from "./components/Quiz";
import Timer from "./components/Timer";
import { questions, prizeSums } from "./questions";
import Modal from "./components/Modal"; // Importieren der Modal-Komponente

function App() {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [timeOut, setTimeOut] = useState(false);
  const [answersLocked, setAnswersLocked] = useState(false);
  const [isMillionaire, setIsMillionaire] = useState(false);
  const [earnedMoney, setEarnedMoney] = useState("0 €");
  const [quizStarted, setQuizStarted] = useState(false);
  const [showExplanationModal, setShowExplanationModal] = useState(false); // Neuer State
  const [explanation, setExplanation] = useState(""); // Neuer Zustand für Erklärungstext

  // Update earned money when the question number changes
  useEffect(() => {
    // only start tracking after player got through first question
    if (questionNumber > 1) {
      const prize = prizeSums.find((item) => item.id === questionNumber - 1);
      if (prize) {
        setEarnedMoney(prize.amount);
      }
    }
  }, [questionNumber]);

  // Define a function to update isMillionaire state
  const handleBecomeMillionaire = () => {
    setIsMillionaire(true);
  };

  const resetGame = () => {
    setQuestionNumber(1);
    setTimeOut(false);
    setIsMillionaire(false);
    setEarnedMoney("0 €");
    setQuizStarted(false);
    setShowExplanationModal(false);
    setExplanation("");
    
    // Optionally, ensure all audio is stopped by unmounting Quiz component
    // This is already handled by the cleanup in Quiz.js
  };

  const handleNextQuestion = () => {
    setQuestionNumber((prev) => prev + 1);
    setAnswersLocked(false);
    setShowExplanationModal(false);
    setExplanation("");
  };

  return (
    <div className="App">
      <div className={`main ${showExplanationModal ? "blur" : ""}`}>
        {/* Entfernen Sie den GameOver-Block */}
        {/* {timeOut ? (
          <GameOver className="game-over" earnedMoney={earnedMoney} />
        ) : isMillionaire ? (
          <GameWinner className="game-over" />
        ) : (
          // game content
        )} */}

        {/* Aktualisieren Sie die Bedingung zur Anzeige des GameWinner */}
        {!isMillionaire && !timeOut && (
          <div className="game-container">
            <div className="quiz-section">
              <div className="timer">
                <Timer
                  setTimeOut={setTimeOut}
                  questionNumber={questionNumber}
                  answersLocked={answersLocked}
                  quizStarted={quizStarted}
                  isPaused={showExplanationModal} // Neue Prop
                />
              </div>
              <Quiz
                questions={questions}
                questionNumber={questionNumber}
                setQuestionNumber={setQuestionNumber}
                setTimeOut={setTimeOut}
                setAnswersLocked={setAnswersLocked} // Sicherstellen, dass dies übergeben wird
                handleBecomeMillionaire={handleBecomeMillionaire}
                quizStarted={quizStarted}
                setQuizStarted={setQuizStarted}
                setShowExplanationModal={setShowExplanationModal}
                setExplanation={setExplanation} // Neue Prop
              />
            </div>
            <div className="money">
              <ul className="money-list">
                {prizeSums
                  .slice(0)
                  .reverse()
                  .map((item) => (
                    <li
                      className={
                        questionNumber === item.id ? "item active" : "item"
                      }
                      key={item.id}
                    >
                      <h5 className="amount">{item.amount}</h5>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        )}

        {/* Anzeige von GameWinner, falls isMillionaire true ist */}
        {isMillionaire && (
          <GameWinner className="game-over" />
        )}
      </div>
      {showExplanationModal && (
        <Modal>
          <div className="explanation-modal">
            <p>
              {explanation} {!timeOut && "🎉"}
            </p>
            {isMillionaire || timeOut ? (
              <button className="next-button" onClick={resetGame}>
                Starte neu!
              </button>
            ) : (
              <button className="next-button" onClick={handleNextQuestion}>
                Weiter
              </button>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}

export default App;
