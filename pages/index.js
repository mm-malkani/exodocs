import { onAuthStateChanged } from "@firebase/auth"
import Head from "next/head"
import React, { useEffect, useState } from "react"
import MainTemplatePage from "../components/MainTemplatePage"
import NavbarBasic from "../components/NavbarBasic"
import { auth } from "../firebase/firebaseConfig"
import KanbanLists from "../kanban/KanbanLists"
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
				<link
					rel="stylesheet"
					href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
					integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
					crossorigin="anonymous"
				/>
			</Head>

			{/* <KanbanLists /> */}

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
