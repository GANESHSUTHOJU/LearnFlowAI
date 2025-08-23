
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  "projectId": "learnflowai-hk6c5",
  "appId": "1:755832706965:web:5708a00cf1634aa199489c",
  "storageBucket": "learnflowai-hk6c5.firebasestorage.app",
  "apiKey": "AIzaSyC4sv2-RjJBQZ0EZe_LrbDFnVxKr34T3lg",
  "authDomain": "learnflowai-hk6c5.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "755832706965"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
