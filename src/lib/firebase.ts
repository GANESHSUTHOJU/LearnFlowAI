
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4sv2-RjJBQZ0EZe_LrbDFnVxKr34T3lg",
  authDomain: "learnflowai-hk6c5.firebaseapp.com",
  projectId: "learnflowai-hk6c5",
  storageBucket: "learnflowai-hk6c5.firebasestorage.app",
  messagingSenderId: "755832706965",
  appId: "1:755832706965:web:5708a00cf1634aa199489c",
  measurementId: ""
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
