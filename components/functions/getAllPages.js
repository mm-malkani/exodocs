import { child, get, ref } from "firebase/database"
import { db } from "../../config/firebaseConfig"

export const getAllPages = uid => {
	const dbRef = ref(db)
	get(child(dbRef, `${uid}/`))
		.then(snapshot => {
			if (snapshot.exists()) {
				// console.debug(snapshot.val())
			} else {
				// console.debug("No data available")
			}
		})
		.catch(error => {
			console.error(error)
		})
}

export default getAllPages
