import { onAuthStateChanged } from "@firebase/auth"
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// const handleSignout = () => {
	// 	signOut(auth)
	// 		.then(() => {
	// 			alert("SignOut Success")
	// 		})
	// 		.catch(err => {
	// 			console.log(err)
	// 			alert("signOut Failed")
	// 		})
	// }

	return (
		<>
			<Head>
				<title>ExoDocs - Professional Docs Sharing App Online</title>
				<meta
					name="description"
					content="ExoDocs - Professional Docs Sharing App Online"
				/>
				<link
					rel="icon/png"
					href="/favicon.ico"
				/>
			</Head>

			{/* <KanbanLists /> */}

			{!login && (
				<>
					<NavbarBasic></NavbarBasic>
					<div>
						<p>You Must Login To Continue</p>
					</div>
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
