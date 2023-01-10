// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2mTnG4uTFZrPNBJuUU3O7Tigr9mvXzrQ",
  authDomain: "newblog-14781.firebaseapp.com",
  projectId: "newblog-14781",
  storageBucket: "newblog-14781.appspot.com",
  messagingSenderId: "197615250112",
  appId: "1:197615250112:web:53939e366bd14f6f04db25"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
export const db = getFirestore(app);
export default app;