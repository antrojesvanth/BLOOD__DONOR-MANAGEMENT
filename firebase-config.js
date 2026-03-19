// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlKSxzJQj27ZgNfuU2olM3nUo734_5hCM",
  authDomain: "bloodlink-bd4ff.firebaseapp.com",
  projectId: "bloodlink-bd4ff",
  storageBucket: "bloodlink-bd4ff.firebasestorage.app",
  messagingSenderId: "452236946912",
  appId: "1:452236946912:web:89e42d502c0d7931794f85",
  measurementId: "G-ENPXE4JV2W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
