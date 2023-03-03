import { onAuthStateChanged } from "firebase/auth"
import Head from "next/head"
import { useEffect, useState } from "react"
import LoadingBar from "react-top-loading-bar"
import { auth } from "../config/firebaseConfig"

const Home = () => {
	const [login, setLogin] = useState("")
	const [progress, setProgress] = useState(20)

	useEffect(() => {
		onAuthStateChanged(auth, user => {
			if (user) {
				setLogin(true)
				localStorage.setItem("user", JSON.stringify(user))
				// setUserObject(user)
				// console.log(user);
			} else {
				setLogin(false)
			}
		})
	}, [])

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
			<LoadingBar
				color="#f11946"
				progress={progress}
				onLoaderFinished={() => setProgress(0)}
			/>

			{/* Content section */}
			<main className="flex-1 overflow-y-auto">
				{/* Navbar */}

				{/* Content section */}
				<div className="p-4">
					<h1
						onClick={() => {
							setProgress(100)
						}}
						className="text-2xl font-bold mb-4"
					>
						Content Section
					</h1>
					{/* Content section content goes here */}
				</div>
			</main>
		</>
	)
}

export default Home
