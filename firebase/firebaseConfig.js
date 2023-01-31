// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { GoogleAuthProvider } from "firebase/auth"
import { getDatabase } from "firebase/database"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCw4Oj3P-4g_eNGLnrl6CjNP0pFZVnkK7M",
	authDomain: "exodocs-auth.firebaseapp.com",
	databaseURL:
		"https://exodocs-auth-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "exodocs-auth",
	storageBucket: "exodocs-auth.appspot.com",
	messagingSenderId: "657546255732",
	appId: "1:657546255732:web:12959ddea4aff5116fa021",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const provider = new GoogleAuthProvider()
export const auth = getAuth(app)
export const db = getDatabase(app)
