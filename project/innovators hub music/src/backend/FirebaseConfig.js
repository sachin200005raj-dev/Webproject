// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOQh4bz7Pl6tOHwFRvXc6OAPMOBNLxIrI",
  authDomain: "innovator-hub-music1.firebaseapp.com",
  projectId: "innovator-hub-music1",
  storageBucket: "innovator-hub-music1.firebasestorage.app",
  messagingSenderId: "376142723648",
  appId: "1:376142723648:web:82167c25be02da0aedfda5"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const __AUTH=getAuth(firebaseApp)
export const __DB=getFirestore(firebaseApp)