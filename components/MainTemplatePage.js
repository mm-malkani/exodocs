import { signOut } from "@firebase/auth"
import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react"
import { auth } from "../firebase/firebaseConfig"
import { userDataStore } from "../zustand/zustandStore"
import EditablePage from "./EditablePage"

const MainTemplatePage = () => {
	const [activeTemplate, setActiveTemplate] = useState("pages")

	const { userObject } = userDataStore()

	// console.log(userObject)
	const [sidebarOpen, setSidebarOpen] = useState(true)
	const [downMenuOpen, setDownMenuOpen] = useState(false)
	const sidebarButtonClicked = () => {
		console.log("sidebar button clicked")
		setSidebarOpen(!sidebarOpen)
	}

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
			{/* -----------------NAVBAR AND SIDEBAR-------------------- */}

			{/* --------------------NAVBAR */}
			<nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
				<div className="px-3 py-3 lg:px-5 lg:pl-3">
					<div className="flex items-center justify-between">
						<div className="flex items-center justify-start">
							<button
								onClick={sidebarButtonClicked}
								type="button"
								className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
							>
								<svg
									className="w-6 h-6"
									aria-hidden="true"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										clipRule="evenodd"
										fillRule="evenodd"
										d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
									></path>
								</svg>
							</button>
							<Link
								href="/"
								className="flex mx-2"
							>
								<Image
									alt="ExoDocs Logo"
									src={"/exoDocsLogo-Removed.png"}
									width={150}
									height={40}
								></Image>
							</Link>
						</div>

						{/* SPECIAL ITEMS ACCESS MENU SIGNOUT FAVOURITES SHARE Button */}

						<div className="flex items-center">
							<button
								onClick={downMenuClicked}
								type="button"
								className={`${
									downMenuOpen && "rotate-180"
								} transition-all duration-200 inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600`}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-6 h-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25"
									/>
								</svg>
							</button>
						</div>

						<div
							id="logo-sidebar"
							className={`${
								downMenuOpen
									? "fixed top-16 right-4 z-40 w-fit h-fit transition-transform bg-white border border-slate-500 dark:border-gray-700 rounded p-2 flex space-x-2 items-center justify-center"
									: "hidden"
							}`}
						>
							<div>
								<button className="inline-flex items-center bg-slate-100 border-0 py-1 px-3 focus:outline-none hover:bg-slate-200 rounded text-sm mt-0">
									<span className="hidden sm:block">
										Add to Favoutites
									</span>

									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1}
										stroke="currentColor"
										className="w-4 h-4 mx-1"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
										/>
									</svg>
								</button>
							</div>
							<div>
								<button className="inline-flex items-center bg-slate-100 border-0 py-1 px-3 focus:outline-none hover:bg-slate-200 rounded text-sm mt-0">
									<span className="hidden sm:block">
										Share
									</span>

									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1}
										stroke="currentColor"
										className="w-4 h-4 mx-1"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
										/>
									</svg>
								</button>
							</div>
							<div>
								<button
									onClick={handleSignout}
									className="inline-flex items-center bg-slate-100 border-0 py-1 px-3 focus:outline-none hover:bg-slate-200 rounded text-sm mt-0"
								>
									Signout
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-4 h-4 mx-1"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
										/>
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>
			</nav>

			<div className="flex justify-end">
				{/* --------------------SIDEBAR */}

				<aside
					id="logo-sidebar"
					className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
						sidebarOpen ? "-translate-x-full" : "translate-x-0"
					} bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700`}
					aria-label="Sidebar"
				>
					<div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
						<div className="navButtons flex items-center justify-evenly space-x-2 mb-1">
							<Link
								className={`border-b-2 hover:bg-slate-300 ${
									activeTemplate === "pages" &&
									"bg-slate-300 border-slate-600"
								} p-1 rounded `}
								href={"/"}
							>
								All Pages
							</Link>
							<Link
								className={`border-b-2 hover:bg-slate-300 hover: p-1 rounded ${
									activeTemplate === "kanban" &&
									"bg-slate-300 border-slate-600"
								}`}
								href={"/kanban"}
							>
								Kanban Boards
							</Link>
						</div>
						<ul className="space-y-2">
							<li>
								<div className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.2}
										stroke="currentColor"
										className="w-6 h-6"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
										/>
									</svg>

									<span className="flex-1 ml-3">
										{userObject.email}
									</span>
								</div>
							</li>

							<li>
								<div className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-6 h-6"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>

									<span className="flex-1 ml-3">
										Create A New Page
									</span>
								</div>
							</li>
							<li>
								<div className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-6 h-6"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
										/>
									</svg>

									<span className="flex-1 ml-3">
										Favourites
									</span>
								</div>
								<ol className="space-y-1">
									<li>
										Lorem ipsum dolor sit adsdasd asdasdasd
									</li>
									<li>
										Lorem ipsum dolor sit adsdasd asdasdasd
									</li>
								</ol>
							</li>
							<li>
								<div className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-6 h-6"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
										/>
									</svg>

									<span className="flex-1 ml-3">
										All Pages
									</span>
								</div>
								<ol className="space-y-1">
									<li>
										Lorem ipsum dolor sit adsdasd asdasdasd
									</li>
									<li>
										Lorem ipsum dolor sit adsdasd asdasdasd
									</li>
									<li>
										Lorem ipsum dolor sit adsdasd asdasdasd
									</li>
								</ol>
							</li>
						</ul>
					</div>
				</aside>

				<div
					className={`p-5 mt-14 ${
						!sidebarOpen
							? "w-2/3 lg:w-3/4 xl:w-4/5 2xl:w-10/12 mr-4"
							: "w-screen"
					}`}
				>
					<EditablePage></EditablePage>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit.
					Illo, fugiat asperiores! Vero voluptates, itaque voluptas ad
					consequuntur architecto, error quas quisquam unde odit
					repudiandae nulla earum sed id laudantium beatae.
				</div>
			</div>
		</div>
	)
}

export default MainTemplatePage
