import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App";

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDaAfhRAhTXAHtDpG7hcDJnKmZsO6XBpQY",
  authDomain: "job-tmhur.firebaseapp.com",
  projectId: "job-tmhur",
  storageBucket: "job-tmhur.appspot.com",
  messagingSenderId: "988088207240",
  appId: "1:988088207240:web:fa5b8b7f518e997ce25c3d",
};

initializeApp(firebaseConfig);
export const storage = getStorage(initializeApp(firebaseConfig));
const db = getFirestore();
const colRef = collection(db, "jobs");
const auth = getAuth();

export default getFirestore;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
