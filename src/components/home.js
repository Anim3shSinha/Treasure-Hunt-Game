import React, { useEffect, useState } from "react";
import Img from "../styles/logo1.png";
import "../styles/home.css";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";

const Home = (props) => {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userLvl, setUserLvl] = useState("");

  const nav = useNavigate();

  useEffect(() => {
    const url = window.location.href;
    const arr = url.split("/");
    // eslint-disable-next-line
    setUserId(arr[4]);

    const getDocument = async (id) => {
      const docRef = doc(db, "users", id);
      onSnapshot(docRef, (doc) => {
        setUserName(doc.data().name);
        setUserLvl(doc.data().level);
      });
    };

    getDocument(userId);
  }, [userId, userName]);

  const navigateToLand = () => {
    nav("/");
  };

  const navigateToGame = () => {
    const updateUser = async () => {
      const userDoc = doc(db, "users", userId);
      const newField = { level: Number(1) };
      const newTime = { time: Number(0) };
      const newTime1 = { time1: Number(0) };
      const newTime2 = { time2: Number(0) };
      await updateDoc(userDoc, newTime);
      await updateDoc(userDoc, newTime1);
      await updateDoc(userDoc, newTime2);
      await updateDoc(userDoc, newField);
    };
    updateUser();
    nav(`/game/${userId}/1`);
  };

  const navigateToContGame = () => {
    nav(`/game/${userId}/${userLvl}`);
  };

  const navigateToLead = () => {
    nav("/leader");
  };

  return (
    <>
      <div className="cont">
        <img src={Img} alt="" />
      </div>
      <div className="greet">
        <h1>
          <span>Greetings! {userName}</span>
        </h1>
      </div>

      <div className="opt">
        <ul>
          <li onClick={navigateToGame}>New Game</li>
          <li onClick={navigateToContGame}>Continue Game</li>
          <li onClick={navigateToLead}>Leader Board</li>
          <li onClick={navigateToLand}>Quit</li>
        </ul>
      </div>
    </>
  );
};

export default Home;
