import { ref, child, get } from "firebase/database"
import { db } from "../../config/firebaseConfig"

export const getAllPages = uid => {
	const dbRef = ref(db)
	get(child(dbRef, `${uid}/`))
		.then(snapshot => {
			if (snapshot.exists()) {
				console.log(snapshot.val())
			} else {
				console.log("No data available")
			}
		})
		.catch(error => {
			console.error(error)
		})
}
