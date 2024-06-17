import React from "react";

const Results = ({ questions, answers, onRestart }) => {
  const calculateScore = () => {
    let score = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correct_answer) {
        score += 1;
      }
    });
    return score;
  };

  return (
    <div className="results-container">
      <h2>Quiz Results</h2>
      <p>
        You scored {calculateScore()} out of {questions.length}
      </p>
      <h3>Correct Answers:</h3>
      <ul>
        {questions.map((question, index) => (
          <li key={index}>
            <strong>Q: {question.question}</strong>
            <br />
            Correct Answer: {question.correct_answer}
            <br />
            Your Answer: {answers[index] || "No answer"}
          </li>
        ))}
      </ul>
      <button onClick={onRestart}>Restart Quiz</button>
    </div>
  );
};

export default Results;
