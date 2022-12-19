// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: "newblog-14781.firebaseapp.com",
  projectId: "newblog-14781",
  storageBucket: "newblog-14781.appspot.com",
  messagingSenderId: "197615250112",
  appId: process.env.REACT_APP_FIREBASE_APPID
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);