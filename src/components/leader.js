import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/feature.css";
import { db } from "../firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
const Leader = () => {
  const [users, setUsers] = useState([]);
  const userCollectionRef = collection(db, "users");
  const nav = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        setUsers();
      });
    };
    getUsers();
    // console.log(users);
  }, []);

  const navigateToLand = () => {
    nav("/");
  };

  return (
    <div className="asd">
      <div className="ma">
        <h1>
          <i>Our Champions </i>
        </h1>

        <h1>&#9889;</h1>

        <p style={{ textAlign: "center" }}>
          <ul
            style={{
              listStyle: "upper-roman",
              display: "inline-block",
              textAlign: "left",
            }}
          >
            <li>this is </li>
          </ul>
        </p>
      </div>
      <div className="btn">
        <button onClick={navigateToLand}> &#8592; Go Back</button>
      </div>
    </div>
  );
};

export default Leader;
