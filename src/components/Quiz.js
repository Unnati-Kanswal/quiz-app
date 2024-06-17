import React, { useState, useEffect } from "react";
import questions from "../data/questions.json";
import Question from "./Question";
import FullScreenPrompt from "./FullScreenPrompt";
import Results from "./Results";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  useEffect(() => {
    const savedAnswers = JSON.parse(localStorage.getItem("answers"));
    const savedTime = JSON.parse(localStorage.getItem("timeLeft"));
    const savedQuestion = JSON.parse(localStorage.getItem("currentQuestion"));

    if (savedAnswers) setAnswers(savedAnswers);
    if (savedTime) setTimeLeft(savedTime);
    if (savedQuestion) setCurrentQuestion(savedQuestion);

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        localStorage.setItem("timeLeft", prevTime - 1);
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem("answers", JSON.stringify(answers));
    localStorage.setItem("currentQuestion", JSON.stringify(currentQuestion));
  }, [answers, currentQuestion]);

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [currentQuestion]: answer });
  };

  const handleNext = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  const handlePrevious = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  const handleFullScreenChange = () => {
    setIsFullScreen(document.fullscreenElement !== null);
  };

  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  const enterFullScreen = () => {
    document.documentElement.requestFullscreen();
  };

  const handleSubmit = () => {
    setIsQuizFinished(true);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setTimeLeft(600);
    setIsQuizFinished(false);
    localStorage.removeItem("answers");
    localStorage.removeItem("timeLeft");
    localStorage.removeItem("currentQuestion");
  };

  if (!isFullScreen) {
    return <FullScreenPrompt onEnterFullScreen={enterFullScreen} />;
  }

  if (isQuizFinished) {
    return (
      <Results
        questions={questions}
        answers={answers}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <div className="quiz-container">
      <div className="timer">
        Time Left: {Math.floor(timeLeft / 60)}:
        {String(timeLeft % 60).padStart(2, "0")}
      </div>
      <Question
        question={questions[currentQuestion].question}
        options={questions[currentQuestion].options}
        currentAnswer={answers[currentQuestion]}
        setAnswer={handleAnswer}
      />
      <div className="navigation-buttons">
        {currentQuestion > 0 && (
          <button onClick={handlePrevious}>Previous</button>
        )}
        {currentQuestion < questions.length - 1 && (
          <button onClick={handleNext}>Next</button>
        )}
        {currentQuestion === questions.length - 1 && (
          <button onClick={handleSubmit}>Submit</button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
