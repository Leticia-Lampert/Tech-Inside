import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAcKkBhesJ5pCDJdQJiCoetXu87dSxo8l8",
  authDomain: "tech-inside-218e5.firebaseapp.com",
  projectId: "tech-inside-218e5",
  storageBucket: "tech-inside-218e5.appspot.com",
  messagingSenderId: "396139737563",
  appId: "1:396139737563:web:aea06ff6426276579bf7fe",
  measurementId: "G-W1G9KJPNTF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore();
const storage = getStorage(app);

export { app, auth, db, storage }

