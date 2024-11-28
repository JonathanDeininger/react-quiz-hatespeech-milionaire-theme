import React, { useState, useEffect, useRef } from "react";
import Background_music from "../assets/Background_music.mp3";
import fiveToEight from "../assets/five-eight.mp3";
import eightToEleven from "../assets/eight-eleven.mp3";
import elevenToThirteen from "../assets/eleven-thirteen.mp3";
import fourteen from "../assets/fourteen.mp3";
import fifteen from "../assets/fifteen.mp3";
import millionaireRave from "../assets/MillionaireRave.mp3";

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
  setAnswersLocked, // Hinzugefügt
}) => {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answersLocked, setAnswersLockedLocal] = useState(false); // Optional: Lokaler Zustand, falls benötigt

  // refs for various audio tracks
  const audioRefs = {
    backgroundMusic: useRef(new Audio(Background_music)),
    fiveToEight: useRef(new Audio(fiveToEight)),
    eightToEleven: useRef(new Audio(eightToEleven)),
    elevenToThirteen: useRef(new Audio(elevenToThirteen)),
    fourteen: useRef(new Audio(fourteen)),
    fifteen: useRef(new Audio(fifteen)),
    millionaireRave: useRef(new Audio(millionaireRave)),
    // TODO: add correct/incorrect sounds, maybe lock in answer
  };

  // Better way to play multiple audios. Plays song for the round and stops and resets all other audio tracks
  const playAudio = (audioRef) => {
    Object.values(audioRefs).forEach((ref) => {
      if (ref.current !== audioRef.current) {
        ref.current.pause();
        ref.current.currentTime = 0;
      }
    });

    // loop the playing songs
    audioRef.current.loop = true;
    audioRef.current.play().catch((error) => {
      console.error("Audio playback failed:", error);
    });
  };

  useEffect(() => {
    if (quizStarted) {
      const {
        backgroundMusic,
        fiveToEight,
        eightToEleven,
        elevenToThirteen,
        fourteen,
        fifteen,
        millionaireRave,
      } = audioRefs;

      // Play specific songs for question numbers. Works fine for different rounds
      if (questionNumber < 6) {
        playAudio(backgroundMusic);
      } else if (questionNumber < 9) {
        playAudio(fiveToEight);
      } else if (questionNumber < 12) {
        playAudio(eightToEleven);
      } else if (questionNumber < 14) {
        playAudio(elevenToThirteen);
      } else if (questionNumber === 14) {
        playAudio(fourteen);
      } else if (questionNumber === 15) {
        playAudio(fifteen);
      } else if (questionNumber === 16) {
        playAudio(millionaireRave);
      }
    }
  }, [questionNumber, quizStarted, audioRefs, playAudio]);

  // Update the current question when the question number changes
  useEffect(() => {
    setQuestion(questions[questionNumber - 1]);
  }, [questions, questionNumber]);

  // Delays the execution of a callback function for any given time
  const delay = (duration, callBack) => {
    setTimeout(() => {
      callBack();
    }, duration);
  };

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
    } else if (!answersLocked) {
      setAnswersLocked(true); // Jetzt korrekt definiert
      
      delay(3000, () => {
        setExplanation(question.explanation); // Erklärungstext setzen
        setShowExplanationModal(true); // Globales Modal anzeigen

        if (selectedAnswer.correct) {
          // Keine automatische Weiterleitung
        } else {
          delay(1000, () => {
            setAnswersLocked(false);
            setTimeOut(true);
            setShowExplanationModal(false); // Modal schließen bei Fehler
          });
        }
      });
    }
  };

  // Handles the "Weiter" button click im Modal wird jetzt in App.js verwaltet

  return (
    <div className="quiz-content">
      {!quizStarted ? (
        <div className="start-container">
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