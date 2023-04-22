import React, { useEffect, useState } from "react";
import "../styles/game.css";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";

const Game1 = () => {
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
    if (inputValue === "POSEIDON") {
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
      const newField = { level: Number(2) };
      const newTime = { time: Number(time) };
      await updateDoc(userDoc, newField);
      await updateDoc(userDoc, newTime);
    };
    updateUser();
    nav(`/game/${userId}/2`);
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
            <i> &#9733; RIDDLE 1 &#9733;</i>
          </h1>
        </div>
        <div className="gamecontent">
          <p>
            I am a god of the sea, With trident in hand, I decree. My power is
            vast, my wrath is fierce, And sailors know to give me reverence. Who
            am I, ruler of the waves, Whose kingdom lies beneath the briny deep?
            My name is spoken with fear and awe, And those who cross me, forever
            sleep.
          </p>

          <input
            id="input-field"
            type="text"
            value={inputValue}
            placeholder="__ __ __ __ __ __ __ __"
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

export default Game1;
