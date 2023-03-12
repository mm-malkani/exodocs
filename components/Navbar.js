import { onAuthStateChanged } from "firebase/auth"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { auth } from "../config/firebaseConfig"

const Navbar = ({ toggleSidebar }) => {
	const [login, setLogin] = useState("")

	useEffect(() => {
		onAuthStateChanged(auth, user => {
			if (user) {
				setLogin(true)
				// setUserObject(user)
				// console.log(user);
			} else {
				setLogin(false)
			}
		})
	}, [])

	return (
		<nav className="bg-gray-700 p-4 overflow-x-hidden">
			<div className="flex justify-between items-center">
				<div className="flex space-x-2">
					{login && (
						<button
							className="text-white focus:outline-none"
							onClick={toggleSidebar}
						>
							{/* Mobile menu button */}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="w-6 h-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
								/>
							</svg>
						</button>
					)}
					<h1 className="text-white text-2xl font-bold">
						<Link href={"/"}>ExoDocs</Link>
					</h1>
				</div>

				{/* {login && (
					<div title="Reload Content">
						<svg
							onClick={handleRefresh}
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="white"
							className="w-6 h-6 cursor-pointer active:animate-spin"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
							/>
						</svg>
					</div>
				)} */}

				{!login && (
					<div className="flex space-x-2">
						<Link
							href={"/login"}
							className="inline-flex items-center bg-slate-100 border-0 py-1 px-1 sm:px-2 md:px-3 focus:outline-none hover:bg-slate-200 rounded text-sm sm:text-base mt-0"
						>
							Login
							<svg
								fill="none"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								className="w-4 h-4 ml-1"
								viewBox="0 0 24 24"
							>
								<path d="M5 12h14M12 5l7 7-7 7"></path>
							</svg>
						</Link>
						<Link
							href={"/signup"}
							className="inline-flex items-center bg-slate-100 border-0 py-1 px-1 sm:px-2 md:px-3 focus:outline-none hover:bg-slate-200 rounded text-sm sm:text-base mt-0"
						>
							SignUp
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-5 h-5 ml-1"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
								/>
							</svg>
						</Link>
					</div>
				)}
			</div>
		</nav>
	)
}

export default Navbar
