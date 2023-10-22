import { onAuthStateChanged } from "firebase/auth"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import LoadingBar from "react-top-loading-bar"
import { Navbar, Sidebar } from "../components/organisms"
import { auth } from "../config/firebaseConfig"
import "../styles/globals.css"

function MyApp({ Component, pageProps }) {
	const router = useRouter()
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)
	// eslint-disable-next-line
	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen)
	}
	const [loading, setLoading] = useState(false)
	const [refresh, setRefresh] = useState(false)
	const [screenWidth, setScreenWidth] = useState()
	const [login, setLogin] = useState(false)

	useEffect(() => {
		onAuthStateChanged(auth, user => {
			if (user) {
				setLogin(true)
			} else {
				setLogin(false)
			}
		})
	}, [])

	useEffect(() => {
		const handleRouteChangeStart = () => setLoading(true)
		const handleRouteChangeComplete = () => setLoading(false)
		setScreenWidth(screen.width)

		router.events.on("routeChangeStart", handleRouteChangeStart)
		router.events.on("routeChangeComplete", handleRouteChangeComplete)

		return () => {
			router.events.off("routeChangeStart", handleRouteChangeStart)
			router.events.off("routeChangeComplete", handleRouteChangeComplete)
		}
	}, [router, toggleSidebar])
	return (
		<>
			<ToastContainer
				position="top-center"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover={false}
				theme="dark"
			/>
			<LoadingBar
				color="#1DB700"
				height={3}
				progress={loading ? 30 : 100}
			/>
			<Sidebar
				{...{ toggleSidebar, isSidebarOpen, refresh, setRefresh }}
			></Sidebar>
			<Navbar {...{ toggleSidebar }}></Navbar>
			<div
				className={`${
					!login
						? "closeWidth"
						: !isSidebarOpen
						? "closeWidth"
						: screenWidth > 420
						? "openWidth"
						: "closeWidth"
				} transition-transform sm:transition-all duration-300`}
			>
				<Component {...pageProps} />
			</div>
		</>
	)
}

export default MyApp
