import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/feature.css";
const Feature = () => {
  const nav = useNavigate();
  const navigateToLand = () => {
    nav("/");
  };

  return (
    <div className="asd">
      <div className="ma">
        <h1>
          &#9733;<i> Features </i>&#9733;
        </h1>
        <p>
          <ul>
            <li>
              <strong> Players stats analysis dashborad for the admin</strong>
              <br />
              The admin can view the stats such as memory power, accuracy and
              creativity of all players.
            </li>
            <li>
              <strong>Save and Continue game Feature</strong>
              <br />
              Any Player can quit the game and store their progress
            </li>
            <li>
              <strong> 5 Unique puzzles and 2 deadpoints</strong>
              <br />
              The user get to experience 5 crazy games and also faces two dead
              points if they answers wrong
            </li>
          </ul>
        </p>
      </div>
      <div className="btn">
        <button onClick={navigateToLand}> &#8592; Go Back</button>
      </div>
    </div>
  );
};

export default Feature;
