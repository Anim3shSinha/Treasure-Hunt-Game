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
          <i>
            You are now a <br /> Champion
          </i>
          <br />
        </h1>
        <p style={{ textAlign: "center" }}>
          With sword in hand and heart ablaze, You battled through the winding
          maze, Defying traps and dangers dire, To claim the treasure you
          desired. A conqueror of the greatest measure, Whose glory none can
          ever treasure. <br />
          <a
            href="https://youtu.be/xvFZjo5PgG0"
            target="_blank"
            style={{
              color: "white",
              textDecoration: "none",
              background: "red",
              textAlign: "center",
            }}
          >
            Cick to claim your reward !!!
          </a>
        </p>
      </div>
      <div className="btn" style={{ width: "500px" }}>
        <button onClick={navigateToLand}> &#8592; Go Back</button>
      </div>
    </div>
  );
};

export default Lost;
