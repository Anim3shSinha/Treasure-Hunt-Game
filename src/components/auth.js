import React, { useState } from "react";
import "../styles/auth.css";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

const Auth = () => {
  const [newUser, setNewUsers] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPass, setNewPass] = useState("");

  const userCollectionRef = collection(db, "users");

  const nav = useNavigate();

  const createUser = async () => {
    const q1 = query(
      userCollectionRef,
      where("email", "==", newEmail),
      where("password", "==", newPass)
    );
    if (!q1) {
      console.log("User Already exist!");
    } else {
      // eslint-disable-next-line
      const res = await addDoc(userCollectionRef, {
        name: newUser,
        email: newEmail,
        password: newPass,
        time: Number(0),
        time2: Number(0),
        time3: Number(0),
        level: Number(1),
      }).then((res) => {
        nav(`/home/${res.id}`);
      });
    }
  };

  const userLogin = async () => {
    const q1 = query(
      userCollectionRef,
      where("email", "==", newEmail),
      where("password", "==", newPass)
    );
    if (!q1) {
      console.log("No such user!");
    } else {
      const qs = await getDocs(q1);
      let user_id;
      qs.forEach((doc) => {
        user_id = doc.id;
      });
      nav(`/home/${user_id}`);
    }
  };

  const navigateToLand = () => {
    nav("/");
  };

  return (
    <>
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" />
        <div className="signup">
          <label htmlFor="chk" aria-hidden="true">
            Sign up
          </label>
          <input
            type="text"
            name="txt"
            placeholder="User Name"
            autoComplete="off"
            onChange={(event) => {
              setNewUsers(event.target.value);
            }}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="off"
            onChange={(event) => {
              setNewEmail(event.target.value);
            }}
            required
          />
          <input
            type="Password"
            name="pswd"
            placeholder="Password"
            autoComplete="new-password"
            onChange={(event) => {
              setNewPass(event.target.value);
            }}
            required
          />
          <button onClick={createUser}>Sign Up</button>
        </div>

        <div className="login">
          <label htmlFor="chk" aria-hidden="true">
            Login
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(event) => {
              setNewEmail(event.target.value);
            }}
            autoComplete="off"
            required
          />
          <input
            type="Password"
            name="pswd"
            placeholder="Password"
            autoComplete="new-password"
            onChange={(event) => {
              setNewPass(event.target.value);
            }}
            required
          />
          <button onClick={userLogin}>Loign</button>
        </div>
      </div>

      <div>
        <button onClick={navigateToLand}> &#8592; Go Back</button>
      </div>
    </>
  );
};

export default Auth;
