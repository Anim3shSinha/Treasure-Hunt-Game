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
              this is feature
              <br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Pariatur, eveniet?
            </li>
            <li>
              this is feature
              <br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Pariatur, eveniet?
            </li>
            <li>
              this is feature
              <br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Pariatur, eveniet?
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
