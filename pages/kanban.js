import { signOut } from "firebase/auth"
import React, { useState } from "react"
import KanbanTemplate from "../components/KanbanTemplate"
import { auth } from "../config/firebaseConfig"
import { userDataStore } from "../zustand/zustandStore"

const Kanban = () => {
	const [activeTemplate] = useState("")
	const { userObject } = userDataStore()
	const [sidebarOpen, setSidebarOpen] = useState(true)
	const sidebarButtonClicked = () => {
		console.log("sidebar button clicked")
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
		console.log("Down Menu Clicked")
	}
	return (
		<div className="flex flex-row">
			<div
				className={`p-5 mt-14 ${
					!sidebarOpen ? "w-screen" : "w-screen"
				}`}
			>
				<KanbanTemplate />
			</div>
		</div>
	)
}

export default Kanban
