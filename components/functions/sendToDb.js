import { ref, set } from "firebase/database"
import { db } from "../../config/firebaseConfig"

export const sendDataToFirebase = (uid, type, slug) => {
	// const ref = db.ref(`${uid}/${type}/${slug}`)

	// Retrieve data from local storage
	const storedData = localStorage.getItem(slug)

	// Send data to Firebase Realtime Database
	set(ref(db, `${uid}/${type}/${slug}`), { storedData })
		.then(() => {
			console.log("Published!")
		})
		.catch(error => {
			console.error("Error sending data :", error)
		})
}
