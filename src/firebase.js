// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD02seTtPCorTBLITzt5j5Wb77qtgxK7hY",
  authDomain: "podcast-app-71beb.firebaseapp.com",
  projectId: "podcast-app-71beb",
  storageBucket: "podcast-app-71beb.appspot.com",
  messagingSenderId: "483121839611",
  appId: "1:483121839611:web:ecf2fcdba726ec23869f5e",
  measurementId: "G-8D85YZVK75"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);