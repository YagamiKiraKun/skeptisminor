// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOzBxj-mIuKPkqx6fcJ4bV_YrKE7qox1k",
  authDomain: "skeptis-minor.firebaseapp.com",
  projectId: "skeptis-minor",
  storageBucket: "skeptis-minor.firebasestorage.app",
  messagingSenderId: "717828493588",
  appId: "1:717828493588:web:6408eaf6607ca05f99b201",
  measurementId: "G-NL8R5Y05CW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);