// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5NbSP_LrR5dIN44iUci1f7avEGdnvgbw",
  authDomain: "treasure-hunt-a9524.firebaseapp.com",
  projectId: "treasure-hunt-a9524",
  storageBucket: "treasure-hunt-a9524.appspot.com",
  messagingSenderId: "2446577462",
  appId: "1:2446577462:web:a456ea1ceb279f4b0e6d97",
  measurementId: "G-4ECDHYFE2S",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
