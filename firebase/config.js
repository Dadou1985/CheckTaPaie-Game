// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDY4E1NpJu4k3gszBtWiujDXcKI1j_Xouo",
  authDomain: "checktapaie-3a37e.firebaseapp.com",
  projectId: "checktapaie-3a37e",
  storageBucket: "checktapaie-3a37e.appspot.com",
  messagingSenderId: "139392778274",
  appId: "1:139392778274:web:504092c152d3fdc8488a7b",
  measurementId: "G-T5DR2XS4XW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);