import React from "react";
import "../styles/land.css";
import Img from "../styles/logo1.png";
import { useNavigate } from "react-router-dom";

const Land = () => {
  const nav = useNavigate();

  const navigateToAuth = () => {
    nav("/auth");
  };

  const navigateToAbout = () => {
    nav("/about");
  };

  const navigateToFeat = () => {
    nav("/feature");
  };

  const navigateToLead = () => {
    nav("/leader");
  };

  return (
    <>
      <div className="header">
        <ul>
          <li onClick={navigateToAbout}>About</li>
          <li onClick={navigateToFeat}>Features</li>
          <li>
            <img
              src={Img}
              alt="LOGO"
              style={{
                maxWidth: "100%",
                maxHeight: " 80%",
                marginTop: "10px",
              }}
            />
          </li>
          <li onClick={navigateToAuth}>Login</li>
          <li onClick={navigateToLead}>Leader Board</li>
        </ul>
      </div>
      <main>
        <p>
          Attention treasure hunters! We have a challenge for you. Hidden
          somewhere on the internet lies a treasure beyond your wildest dreams.
          You'll have to follow clues and solve puzzles to uncover its link. But
          beware, you're not the only ones searching for it. Are you ready to
          begin the hunt?
        </p>
        <button onClick={navigateToAuth}>Play Now</button>
      </main>
    </>
  );
};

export default Land;
