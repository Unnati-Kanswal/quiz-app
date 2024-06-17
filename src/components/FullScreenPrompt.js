import React from "react";

const FullScreenPrompt = ({ onEnterFullScreen }) => {
  return (
    <div className="fullscreen-prompt">
      <p>Please enter full-screen mode to start the quiz.</p>
      <button onClick={onEnterFullScreen}>Enter Full-Screen</button>
    </div>
  );
};

export default FullScreenPrompt;
