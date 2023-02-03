import React, { useState } from "react"
import { userDataStore } from "../zustand/zustandStore"
import EditablePage from "./EditablePage"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"

const MainTemplatePage = () => {
	const { userObject } = userDataStore()
	const [sidebarOpen, setSidebarOpen] = useState(true)
	const sidebarButtonClicked = () => {
		// console.log("sidebar button clicked")
		setSidebarOpen(!sidebarOpen)
	}

	const [downMenuOpen, setDownMenuOpen] = useState(false)

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

	const downMenuClicked = () => {
		setDownMenuOpen(!downMenuOpen)
		// console.log("Down Menu Clicked")
	}

	// console.log(userObject)

	// const writeToDatabase = () => {
	// 	const uniId = uid(16)
	// 	set(ref(db, `/${auth.currentUser.uid}/${uniId}`), {
	// 		inputValue: inputValue,
	// 		uniId: uniId
	// 	}).then(() => {
	// 		setInputValue("")
	// 		alert("Database Uploaded")
	// 	}).catch((err) => console.log(err))
	// }

	return (
		<div className="flex flex-row">
			{/* -----------------NAVBAR AND SIDEBAR-------------------- */}

			{/* --------------------NAVBAR */}
			<Navbar
				sidebarButtonClicked={sidebarButtonClicked}
				handleSignout={handleSignout}
				downMenuClicked={downMenuClicked}
				downMenuOpen={downMenuOpen}
			></Navbar>

			<div className="flex justify-end">
				{/* --------------------SIDEBAR */}
				<Sidebar
					sidebarOpen={sidebarOpen}
					userObject={userObject}
				></Sidebar>

				<div
					className={`p-5 mt-14 ${
						!sidebarOpen
							? "w-2/3 lg:w-3/4 xl:w-4/5 2xl:w-10/12 mr-4"
							: "w-full"
					}`}
				>
					<EditablePage></EditablePage>
				</div>
			</div>
		</div>
	)
}

export default MainTemplatePage
