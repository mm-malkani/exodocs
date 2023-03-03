import React, { useState } from "react"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import "../styles/globals.css"

function MyApp({ Component, pageProps }) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)
	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen)
	}
	return (
		<>
			<Sidebar {...{ toggleSidebar, isSidebarOpen }}></Sidebar>
			<Navbar {...{ toggleSidebar, isSidebarOpen }}></Navbar>
			<Component {...pageProps} />
		</>
	)
}

export default MyApp
