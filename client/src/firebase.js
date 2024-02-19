// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-2a550.firebaseapp.com",
  projectId: "mern-estate-2a550",
  storageBucket: "mern-estate-2a550.appspot.com",
  messagingSenderId: "221458037068",
  appId: "1:221458037068:web:d63a84aa9365bfc19fb7e9",
  measurementId: "G-211JMRVLCV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);