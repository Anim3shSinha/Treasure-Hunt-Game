import React, { useEffect, useState } from "react";
import "../styles/game.css";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";

const Game3 = () => {
  const nav = useNavigate();
  const [userId, setUserId] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [btndis, setBtnDis] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [showcorr, setShowCorr] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    const url = window.location.href;
    const arr = url.split("/");
    // eslint-disable-next-line
    setUserId(arr[4]);
  }, [userId]);

  // console.log(userId);

  useEffect(() => {
    if (showcorr) {
      const timer = setTimeout(() => {
        setShowCorr(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showcorr]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    const formattedValue = inputValue.toUpperCase();
    setInputValue(formattedValue);
  };

  const handlesubmit = () => {
    setShowCorr(true);
    if (inputValue === "ATLANNA") {
      setBtnDis(true);
      setCorrect(true);
    } else {
      setBtnDis(false);
      setCorrect(false);
    }
  };

  const handleNext = () => {
    const updateUser = async () => {
      const userDoc = doc(db, "users", userId);
      const newField = { level: Number(4) };
      const newTime = { time2: Number(time) };
      await updateDoc(userDoc, newField);
      await updateDoc(userDoc, newTime);
    };
    updateUser();
    nav(`/game/${userId}/4`);
  };

  const handleQuit = () => {
    nav(`/home/${userId}`);
  };

  return (
    <>
      <div className="gamebody">
        <h1 className="he">{formatTime(time)}</h1>
        <div className="heading1">
          <h1>
            <i> &#9733; RIDDLE 3 &#9733;</i>
          </h1>
        </div>
        <div className="gamecontent">
          <p>
            I am a queen of the sea, Yet my son's not like me. He's a hero on
            land, But I rule the ocean grand. My name you may not know, But
            without me, he wouldn't grow. Who am I, you might ask?
          </p>
          <br />
          <a
            style={{ fontSize: "20px", textDecoration: "none" }}
            href="https://youtu.be/Cg4ENbUYAKM"
            target="_blank"
          >
            Click here for video reference
            <br />
          </a>
          <input
            id="input-field"
            type="text"
            value={inputValue}
            placeholder="__ __ __ __ __ __ __"
            onChange={handleInputChange}
            autoComplete="off"
          />

          <button
            style={{
              width: "100px",
              height: "100px",
              backgroundColor: "blue",
            }}
            onClick={handlesubmit}
          >
            Submit
          </button>

          <div
            className="answer"
            style={
              correct
                ? {
                    fontSize: "20px",
                    color: "white",
                    background: "green",
                  }
                : {
                    fontSize: "20px",
                    color: "white",
                    background: "red",
                  }
            }
          >
            {showcorr
              ? correct
                ? "Correct answer you can proceed"
                : " wrong answer "
              : ""}
          </div>
        </div>

        <div className="btn">
          <button
            className="left-button"
            style={{ width: "10%" }}
            onClick={handleQuit}
          >
            Quit
          </button>
          <button
            className="right-button"
            style={
              btndis ? { width: "10%" } : { width: "10%", background: "gray" }
            }
            disabled={!btndis}
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Game3;
