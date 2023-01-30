import { onAuthStateChanged, signOut } from "@firebase/auth"
import Head from "next/head"
import React, { useEffect, useState } from "react"
import MainTemplatePage from "../components/MainTemplatePage"
import NavbarBasic from "../components/NavbarBasic"
import { auth } from "../firebase/firebaseConfig"
import { userDataStore } from "../zustand/zustandStore"

const Home = () => {
	const [login, setLogin] = useState(false)
	const { setUserObject } = userDataStore()

	useEffect(() => {
		onAuthStateChanged(auth, user => {
			if (user) {
				setLogin(true)
				setUserObject(user)
				// console.log(user);
			} else {
				setLogin(false)
			}
		})
	}, [])

	const handleSignout = () => {
		signOut(auth)
			.then(() => {
				alert("SignOut Success")
			})
			.catch(err => {
				console.log(err)
				alert("signOut Failed")
			})
	}

	return (
		<>
			<Head>
				<title>ExoDocs - Professional Docs Sharing App Online</title>
				<meta
					name="description"
					content="ExoDocs - Professional Docs Sharing App Online"
				/>
				<link
					rel="icon"
					href="/favicon.png"
				/>
			</Head>

			{!login && (
				<>
					<NavbarBasic></NavbarBasic>
					<h2>You Must Login To Continue</h2>
				</>
			)}

			{login && (
				<>
					<MainTemplatePage></MainTemplatePage>
					{/* <button onClick={handleSignout}>SignOut</button> */}
				</>
			)}
		</>
	)
}

export default Home
