import React from "react";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const userCollectionRef = collection(db, "users");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      // console.log(data);
    };
    getUsers();
  }, []);

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newField = { age: age + 1 };
    await updateDoc(userDoc, newField);
  };

  return (
    <div className="admin">
      {users.map((user) => {
        return (
          <div>
            <h1>Name : {user.name}</h1>
            <h1>Level : {user.level}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default Admin;
