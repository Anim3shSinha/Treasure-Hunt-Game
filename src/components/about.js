import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/feature.css";
const About = () => {
  const nav = useNavigate();
  const navigateToLand = () => {
    nav("/");
  };

  return (
    <div className="asd">
      <div className="ma">
        <h1 style={{ textAlign: "center" }}>
          <i>About Me</i>
          <br />
          &#128102;
        </h1>
        <p>Hi &#128075; I am Animesh, a passionate web developer.</p>
      </div>
      <div className="btn">
        <button onClick={navigateToLand}> &#8592; Go Back</button>
      </div>
    </div>
  );
};

export default About;
