import React, { useEffect, useState } from "react";
import { images } from "../styles/images";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

function Game5() {
  const nav = useNavigate();

  const BLANK_CARD =
    "https://media.istockphoto.com/id/611868178/photo/pirate-treasure-map.jpg?b=1&s=170667a&w=0&k=20&c=zD2oCiNTHk6KlWCyMK70A0lYtHwL66lCMuhFow8smn4=";

  const [userId, setUserId] = useState("");
  const [imagesArray, setImagesArray] = useState([]);
  const [cardsChosen, setCardsChosen] = useState([]);
  const [cardsChosenIds, setCardsChosenIds] = useState([]);
  const [points, setPoints] = useState(0);
  const [time, setTime] = useState(120);
  const [openCards, setOpenCards] = useState([]);
  const [btndis, setBtnDis] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  function createCardBoard() {
    const imagesGenerated = images?.concat(...images);
    console.log(imagesGenerated);
    const shuffledArray = shuffleArray(imagesGenerated);
    setImagesArray(shuffledArray);
  }

  const formatTime = (timeInSeconds) => {
    if (timeInSeconds === 0) {
      nav(`/lost/${userId}`);
    }
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

  function flipImage(image, index) {
    if (cardsChosenIds?.length === 1 && cardsChosenIds[0] === index) {
      return;
    }

    if (cardsChosen?.length < 2) {
      setCardsChosen((cardsChosen) => cardsChosen?.concat(image));
      setCardsChosenIds((cardsChosenIds) => cardsChosenIds?.concat(index));

      if (cardsChosen?.length === 1) {
        if (cardsChosen[0] === image) {
          setPoints((points) => points + 2);
          console.log(points);
          if (points === 10) {
            setBtnDis(true);
          }
          setOpenCards((openCards) =>
            openCards?.concat([cardsChosen[0], image])
          );
        }
        setTimeout(() => {
          setCardsChosenIds([]);
          setCardsChosen([]);
        }, 700);
      }
    }
  }

  function isCardChosen(image, index) {
    return cardsChosenIds?.includes(index) || openCards?.includes(image);
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  useEffect(() => {
    createCardBoard();
    // eslint-disable-next-line
  }, []);

  const handleNext = () => {
    const updateUser = async () => {
      const userDoc = doc(db, "users", userId);
      const newField = { level: Number(1) };
      await updateDoc(userDoc, newField);
    };
    updateUser();
    nav(`/vic/${userId}`);
  };

  const handleQuit = () => {
    nav(`/home/${userId}`);
  };

  return (
    <div className="gamebody">
      <h1 className="he">{formatTime(time)}</h1>
      <div className="heading1">
        <h1>
          <i> &#9733; RIDDLE 5 &#9733;</i>
        </h1>
        {points <= 10 && (
          <h2
            style={{
              display: "inline-block",
              margin: "35px 29px 36px 83px",
              color: "red",
              background: "black",
              opacity: ".7",
              padding: "5px",
              borderRadius: "20px",
            }}
          >
            choose similar images
          </h2>
        )}
        {points >= 12 && (
          <h2
            style={{
              display: "inline-block",
              margin: "35px 29px 36px 83px",
              color: "white",
              background: "green",
              opacity: ".7",
              padding: "5px",
              borderRadius: "20px",
            }}
          >
            You can proceed !!!
          </h2>
        )}
      </div>

      <div
        className="row no-gutters"
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignContent: "center",
          marginTop: "90px",
          height: "600px",
          width: "800px",
        }}
      >
        {imagesArray?.map((image, index) => {
          return (
            <div
              className="imagecontent"
              key={index}
              onClick={() => flipImage(image, index)}
              style={{
                flex: "1 0 21%",
              }}
            >
              <img
                src={isCardChosen(image, index) ? image : BLANK_CARD}
                alt=""
                className="image"
                style={{
                  width: "calc(100% - 10px)",
                  height: "150px",
                  border: "5px groove brown",
                  borderRadius: "10px",
                  margin: "10px",
                  padding: "5px",
                }}
              />
            </div>
          );
        })}
      </div>

      <div className="btn" style={{ marginTop: "-150px" }}>
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
  );
}
export default Game5;
