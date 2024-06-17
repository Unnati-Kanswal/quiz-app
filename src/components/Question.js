import React from "react";

const Question = ({ question, options, currentAnswer, setAnswer }) => {
  return (
    <div className="question-container">
      <h2>{question}</h2>
      {options.map((option, index) => (
        <button
          key={index}
          className={`option-button ${
            currentAnswer === option ? "selected" : ""
          }`}
          onClick={() => setAnswer(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Question;
