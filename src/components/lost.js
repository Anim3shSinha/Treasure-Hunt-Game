import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/feature.css";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

const Lost = () => {
  const [userId, setUserId] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    const url = window.location.href;
    const arr = url.split("/");
    // eslint-disable-next-line
    setUserId(arr[4]);
  }, [userId]);

  const navigateToLand = () => {
    const updateUser = async () => {
      const userDoc = doc(db, "users", userId);
      const newField = { level: Number(1) };
      await updateDoc(userDoc, newField);
    };
    updateUser();
    nav(`/home/${userId}`);
  };

  return (
    <div className="asd">
      <div className="ma">
        <h1 style={{ textAlign: "center" }}>
          <i>You Lost</i>
          <br />
        </h1>
        <p>
          We regret to inform you that you did not emerge victorious in the
          game. Despite your best efforts, luck was not on your side this time.
          You put up a strong fight, but unfortunately, it wasn't enough to
          secure the win. I hope you continue to pursue your passion for the
          game and come back stronger next time.
        </p>
      </div>
      <div className="btn" style={{ width: "500px" }}>
        <button onClick={navigateToLand}> &#8592; Go Back</button>
      </div>
    </div>
  );
};

export default Lost;
