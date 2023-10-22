import { ref, set } from "firebase/database"
import { db } from "../../config/firebaseConfig"

export const sendDataToFirebase = (uid, type, slug) => {
	// const ref = db.ref(`${uid}/${type}/${slug}`)
	const timestamp = Date().toString().slice(0, -30)

	// Retrieve data from local storage
	let storedData = JSON.parse(localStorage.getItem(slug))
	storedData.updatedOn = timestamp
	storedData = JSON.stringify(storedData)
	localStorage.setItem(slug, storedData)
	// Send data to Firebase Realtime Database
	set(ref(db, `${uid}/${type}/${slug}`), { storedData })
		.then(() => {
			// console.debug("Published!")
		})
		.catch(error => {
			console.error("Error sending data :", error)
		})
}

export default sendDataToFirebase
