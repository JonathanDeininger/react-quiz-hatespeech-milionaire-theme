// GameWinner.js
import React from "react";

// TODO make this look better
function GameWinner({ className }) {
  return (
    <div className={`game-over ${className}`}>
      <h1>Herzlichen Glückwunsch! Sie sind Millionär!</h1>
    </div>
  );
}

export default GameWinner;
