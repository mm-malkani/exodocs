import { onAuthStateChanged, signOut } from "firebase/auth"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { uid } from "uid"
import { auth } from "../config/firebaseConfig"

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
	const [login, setLogin] = useState("")
	const [userObject, setUserObject] = useState({})
	const router = useRouter()

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
	}, [])

	const handleSignOutClick = () => {
		signOut(auth)
			.then(() => {
				alert("Signout Success")
				localStorage.removeItem("user")
			})
			.catch(e => {
				alert("Signout Failed")
			})
	}

	const createNewKanban = () => {
		let yes = confirm("Are you sure you want to create a new Kanban Board")
		if (yes) {
			const id = uid(32)
			router.push("/kanban/" + id)
			toggleSidebar(false)
		}
	}
	const createNewPage = () => {
		let yes = confirm("Are you sure you want to create a new Page")
		if (yes) {
			const id = uid(32)
			router.push("/pages/" + id)
			toggleSidebar()
		}
	}

	return (
		<>
			{login && (
				<aside
					className={`${
						isSidebarOpen
							? "translate-x-0 ease-out"
							: "-translate-x-full ease-in"
					} fixed bg-gray-800 h-screen w-72 transition duration-300 text-white transform z-30`}
				>
					{/* Sidebar */}
					<div className="h-screen flex flex-col p-1.5 overflow-y-auto">
						<div className="flex w-full justify-between items-center h-10">
							<h1 className="text-white text-2xl font-bold p-1.5 cursor-pointer">
								ExoDocs
							</h1>
							{/* Mobile menu button */}
							<button
								className="text-white focus:outline-none"
								onClick={toggleSidebar}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									className="w-7 h-7"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</button>
						</div>
						{/* Sidebar content goes here */}
						<div className="flex flex-col my-2 space-y-2">
							<div className="w-full flex items-center justify-between p-1.5 font-normal rounded-lg text-gray-200 border">
								<div
									title="Profile"
									className="flex cursor-pointer"
								>
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
											d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
										/>
									</svg>
									<Link
										onClick={toggleSidebar}
										href={"/profile"}
										className="ml-1"
									>
										{userObject.email}
									</Link>
								</div>

								<div
									title="SignOut"
									className="inline-flex items-center justify-start text-sm font-medium rounded cursor-pointer"
									onClick={handleSignOutClick}
								>
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
											d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
										/>
									</svg>
								</div>
							</div>

							<ul>
								<li>
									<div className="flex items-center">
										<button
											onClick={createNewKanban}
											className="flex flex-1 p-1.5 text-base font-normal rounded-lg text-white hover:bg-gray-700 cursor-pointer space-x-2"
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
													d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
												/>
											</svg>
											<span>Kanban</span>
										</button>
										<button
											onClick={createNewPage}
											className="flex flex-1 p-1.5 text-base font-normal rounded-lg text-white hover:bg-gray-700 cursor-pointer space-x-2"
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
													d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
												/>
											</svg>
											<span>Page</span>
										</button>
									</div>
								</li>

								<li>
									<div className="flex items-center p-1.5 text-base font-normal rounded-lg text-white hover:bg-gray-700 cursor-pointer">
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
									<ol className="space-y-1 p-1.5">
										<li className="line-clamp-2">
											Lorem ipsum dolor sit amet
											consectetur adipisicing elit. Omnis,
											error?
										</li>
										<li className="line-clamp-2">
											Lorem ipsum dolor sit adsdasd
											asdasdasd
										</li>
									</ol>
								</li>
								<li>
									<div className="flex items-center p-1.5 text-base font-normal rounded-lg text-white hover:bg-gray-700 cursor-pointer">
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
									<ol className="space-y-1 p-1.5">
										<li className="line-clamp-2">
											Lorem ipsum dolor sit adsdasd
											asdasdasd
										</li>
										<li className="line-clamp-2">
											Lorem ipsum dolor sit adsdasd
											asdasdasd
										</li>
										<li className="line-clamp-2">
											Lorem ipsum dolor sit adsdasd
											asdasdasd asdkjbhaslkdjbna
											askldjadasdas
										</li>
									</ol>
								</li>
							</ul>
						</div>
					</div>
				</aside>
			)}
		</>
	)
}

export default Sidebar
