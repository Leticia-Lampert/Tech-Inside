import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCRxkwzIZ6v8Pb5vOCUAogf8sZhyc1uPE8",
  authDomain: "maxum-case.firebaseapp.com",
  databaseURL: "https://maxum-case-default-rtdb.firebaseio.com",
  projectId: "maxum-case",
  storageBucket: "maxum-case.appspot.com",
  messagingSenderId: "980715637654",
  appId: "1:980715637654:web:daa72ad411e0ea27b26bb7",
  measurementId: "G-15X95SM94Y"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { app, auth }

