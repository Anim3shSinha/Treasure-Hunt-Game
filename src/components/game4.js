import React, { useEffect, useState } from "react";
import "../styles/game.css";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import Img from "../styles/puz.jpg";

const Game4 = () => {
  const nav = useNavigate();
  const [userId, setUserId] = useState("");
  const [btndis, setBtnDis] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [showcorr, setShowCorr] = useState(false);
  const [time, setTime] = useState(0);
  const [selectedObjects, setSelectedObjects] = useState([]);

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

  function sleep() {
    return new Promise((resolve) => setTimeout(resolve, 3000));
  }

  const handlesubmit = async () => {
    setShowCorr(true);
    const arr2 = ["statue", "clock", "bench"];
    const areEqual =
      JSON.stringify(selectedObjects.sort()) === JSON.stringify(arr2.sort());
    if (areEqual === true) {
      setBtnDis(true);
      setCorrect(true);
    } else {
      setCorrect(false);
      await sleep();
      nav(`/lost/${userId}`);
    }
  };

  const handleNext = () => {
    const updateUser = async () => {
      const userDoc = doc(db, "users", userId);
      const newField = { level: Number(5) };
      const newTime = { time3: Number(time) };
      await updateDoc(userDoc, newField);
      await updateDoc(userDoc, newTime);
    };
    updateUser();
    nav(`/game/${userId}/5`);
  };

  const handleQuit = () => {
    nav(`/home/${userId}`);
  };

  const objects = ["statue", "clock", "bench", "chest", "shark"];

  const handleObjectClick = (object) => {
    if (selectedObjects.includes(object)) {
      setSelectedObjects((prevSelectedObjects) =>
        prevSelectedObjects.filter((o) => o !== object)
      );
    } else {
      setSelectedObjects((prevSelectedObjects) => [
        ...prevSelectedObjects,
        object,
      ]);
    }
  };

  return (
    <>
      <div className="gamebody">
        <h1 className="he">{formatTime(time)}</h1>
        <div className="heading1">
          <h1>
            <i> &#9733; RIDDLE 4 &#9733;</i>
          </h1>
        </div>

        <div
          className="gamecontent"
          style={{ display: "flex", justifyContent: "center" }}
        >
          {time < 30 ? (
            <>
              <p style={{ fontWeight: "bold" }}>
                Remember the objects in the image. When the clock hits 00:30 you
                have to correctly choose the objects that were in the picture.{" "}
              </p>
              <p
                style={{
                  background: "red",
                  color: "white",
                }}
              >
                Beware player! One wrong choice and lose it all
              </p>
              <img src={Img} alt="Poor Internet connection" height={"200px"} />
            </>
          ) : (
            <>
              <div style={{ textAlign: "center" }}></div>
              <p
                style={{
                  fontWeight: "bold",
                  color: "black",
                  marginLeft: "50px",
                  marginTop: "20px",
                }}
              >
                Select the objects present in the image
              </p>
              {objects.map((object) => (
                <button
                  key={object}
                  onClick={() => handleObjectClick(object)}
                  style={{
                    backgroundColor: selectedObjects.includes(object)
                      ? "green"
                      : "brown",

                    width: "150px",
                    margin: "4px",
                  }}
                >
                  {object}
                </button>
              ))}
              <br />
              <button onClick={handlesubmit} style={{ width: "80px" }}>
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
                    : " wrong answer you lost "
                  : ""}
              </div>
            </>
          )}
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

export default Game4;
