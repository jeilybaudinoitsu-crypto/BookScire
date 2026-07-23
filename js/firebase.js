// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2399huLPWcqEsZNJtfR_D4Mh4RImMQN4",
  authDomain: "bookscire.firebaseapp.com",
  projectId: "bookscire",
  storageBucket: "bookscire.firebasestorage.app",
  messagingSenderId: "891645413609",
  appId: "1:891645413609:web:40daaba270e889048e0878",
  measurementId: "G-B1LFPCRFYX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);