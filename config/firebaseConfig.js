// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { GoogleAuthProvider } from "firebase/auth"
import { getDatabase } from "firebase/database"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLfmyHpvEAZ0QZYfhYyIt1DMs8ZwQ1XbQ",
  authDomain: "exodocs-c6b0a.firebaseapp.com",
  databaseURL: "https://exodocs-c6b0a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "exodocs-c6b0a",
  storageBucket: "exodocs-c6b0a.firebasestorage.app",
  messagingSenderId: "817944492869",
  appId: "1:817944492869:web:bfc0e6eabe8d2ef3b45c2c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const provider = new GoogleAuthProvider()
export const auth = getAuth(app)
export const db = getDatabase(app)


