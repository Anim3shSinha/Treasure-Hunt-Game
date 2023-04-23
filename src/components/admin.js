import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/feature.css";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const userCollectionRef = collection(db, "users");

  const nav = useNavigate();
  const navigateToLand = () => {
    nav("/");
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  const itemList = users.map((item) => (
    <li key={item.name}>
      <p style={{ textDecoration: "underline" }}>{item.name}</p>
      Memory: {((999 - item.time) / 1000) * 5} / 5
      <br />
      Creativity: {((999 - item.time1) / 1000) * 5} / 5
      <br />
      Accuracy: {((999 - item.time2) / 1000) * 5} / 5
      <br />
      Observation:{((999 - item.time3) / 1000) * 5} / 5
      <br /> <br />
      <br />
    </li>
  ));

  return (
    <>
      <div
        className="admin"
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span
          style={{
            background: "#573b8a",
            color: "wheat",
            fontSize: "40px",
            borderRadius: "30px",
            marginTop: "90px",
            marginLeft: "120px",
            marginBottom: "40px",

            padding: "10px",
          }}
        >
          <i> Welcome Admin </i>
        </span>
        <div
          className="asd"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "wheat",
            padding: "30px",
            borderRadius: "20px",
          }}
        >
          <p>
            <h2 style={{ textDecoration: "underline" }}>Player Stats</h2>
            <ul
              style={{
                listStyle: "roman",
                height: "350px",
                overflow: "scroll",
                overflowX: "hidden",
              }}
            >
              {/* <li>
                <p>player 1 </p>
                Memory: 23% <br />
                Creativity: 34% <br />
                Observation: 40% <br /> <br />
                <br />
              </li> */}
              {itemList}
            </ul>
          </p>
        </div>
        <div className="btn">
          <button onClick={navigateToLand}> &#8592; Go Back</button>
        </div>
      </div>
    </>
  );
};

export default Admin;

// {users.map((user) => {
//   return (
//     <div>
//       <h1>Name : {user.name}</h1>
//       <h1>Level : {user.level}</h1>
//     </div>
//   );
// })}
