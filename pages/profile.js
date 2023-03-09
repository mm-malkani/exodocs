import { onAuthStateChanged } from "firebase/auth"
import React, { useState } from "react"
import { useEffect } from "react"
import { auth } from "../config/firebaseConfig"

const Profile = () => {
	const [login, setLogin] = useState(false)
	const [user, setUser] = useState("")
	useEffect(() => {
		onAuthStateChanged(auth, user => {
			if (user) {
				setLogin(true)
				setUser(user)
			} else {
				setLogin(false)
			}
		})
	}, [])

	return (
		<div className="flex w-screen overflow-x-hidden">
			{login && (
				<div className="flex flex-col w-full">
					Logged In as
					<p className="bg-green w-full">{JSON.stringify(user)}</p>
				</div>
			)}
			{!login && <div>Please Login First</div>}
		</div>
	)
}

export default Profile
