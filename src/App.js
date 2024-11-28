import React, { useEffect, useState } from "react";
import "./App.css";
import GameOver from "./components/GameOver";
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

  const handleNextQuestion = () => {
    setQuestionNumber((prev) => prev + 1);
    setAnswersLocked(false);
    setShowExplanationModal(false);
    setExplanation("");
  };

  return (
    <div className="App">
      <div className={`main ${showExplanationModal ? "blur" : ""}`}>
        {timeOut ? (
          <GameOver className="game-over" earnedMoney={earnedMoney} />
        ) : isMillionaire ? (
          <GameWinner className="game-over" />
        ) : (
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
      </div>
      {showExplanationModal && (
        <Modal>
          <div className="explanation-modal">
            <p>{explanation}</p>
            <button className="next-button" onClick={handleNextQuestion}>
              Weiter
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default App;
