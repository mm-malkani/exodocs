import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import LoadingBar from "react-top-loading-bar"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import "../styles/globals.css"

function MyApp({ Component, pageProps }) {
	const router = useRouter()
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)
	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen)
	}
	const [loading, setLoading] = useState(false)
	const [refresh, setRefresh] = useState(false)

	const handleRefresh = () => {
		setRefresh(!refresh)
	}

	useEffect(() => {
		const handleRouteChangeStart = () => setLoading(true)
		const handleRouteChangeComplete = () => setLoading(false)

		router.events.on("routeChangeStart", handleRouteChangeStart)
		router.events.on("routeChangeComplete", handleRouteChangeComplete)

		return () => {
			router.events.off("routeChangeStart", handleRouteChangeStart)
			router.events.off("routeChangeComplete", handleRouteChangeComplete)
		}
	}, [router])
	return (
		<>
			<LoadingBar
				color="#1DB700"
				height={3}
				progress={loading ? 30 : 100}
			/>
			<Sidebar
				{...{ toggleSidebar, isSidebarOpen, refresh, setRefresh }}
			></Sidebar>
			<Navbar {...{ toggleSidebar, handleRefresh }}></Navbar>
			<Component {...pageProps} />
		</>
	)
}

export default MyApp
