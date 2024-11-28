// GameOver.js
import React from "react";

function GameOver({ className, earnedMoney }) {
  // Function for refreshing the page when clicked "hier".
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className={className}>
      <h1>Spiel vorbei</h1>
      <h2>Sie haben {earnedMoney} verdient</h2>
      <p>
        Sie können es erneut versuchen, indem Sie{" "}
        <span
          style={{ textDecoration: "underline", cursor: "pointer" }}
          onClick={refreshPage}
        >
          hier
        </span>{" "}
        klicken oder die Seite aktualisieren.
      </p>
    </div>
  );
}

export default GameOver;
