import { ref, child, get } from "firebase/database"
import { db } from "../../config/firebaseConfig"

const dbRef = ref(db)
get(child(dbRef, `${user.uid}/pages/${slug}`))
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
