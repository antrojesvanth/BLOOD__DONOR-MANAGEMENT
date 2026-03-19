// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9DjzvAxR_ST_4liqaLM-zngkI1K9AYwk",
  authDomain: "bloodlink-781c4.firebaseapp.com",
  projectId: "bloodlink-781c4",
  storageBucket: "bloodlink-781c4.firebasestorage.app",
  messagingSenderId: "565462585503",
  appId: "1:565462585503:web:1d1877ee58066d50ad92aa",
  measurementId: "G-BSDD3GBZB8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
