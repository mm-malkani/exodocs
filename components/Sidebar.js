import { onAuthStateChanged, signOut } from "firebase/auth"
import { child, get, ref } from "firebase/database"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { uid } from "uid"
import { auth, db } from "../config/firebaseConfig"
import CreateKanbanButon from "./atoms/CreateKanbanButon"
import CreatePageButton from "./atoms/CreatePageButton"
import SidebarList from "./atoms/SidebarList"
import SignoutButton from "./atoms/SignoutButton"

const Sidebar = ({ isSidebarOpen, toggleSidebar, refresh }) => {
	const [login, setLogin] = useState("")
	const [userObject, setUserObject] = useState({})
	const router = useRouter()
	const [dataList, setDataList] = useState([])

	useEffect(() => {
		onAuthStateChanged(auth, user => {
			if (user) {
				setLogin(true)
				setUserObject(user)
				let dataListArr = []
				const dbRef = ref(db)
				get(child(dbRef, `${user.uid}/`))
					.then(snapshot => {
						if (snapshot.exists()) {
							setDataList([])
							let data = Object.entries(snapshot.val())
							data.map(obj => {
								let objectArray = Object.values(obj[1])
								// console.debug(objectArray)
								objectArray.map(finalArray => {
									// console.debug(finalArray)
									let ArrayData = JSON.parse(
										finalArray.storedData
									)
									dataListArr.push(ArrayData)
									setDataList(dataListArr)
									// console.debug(ArrayData)
								})
							})
						} else {
							setDataList([])
							// console.debug("No data available")
						}
					})
					.catch(error => {
						console.error(error)
					})
				// console.debug(user);
			} else {
				setLogin(false)
				setUserObject(null)
			}
		})
	}, [router, refresh, dataList])

	const handleSignOutClick = () => {
		signOut(auth)
			.then(() => {
				// alert("Signout Success")
				toast.success("Signout Success!", {
					position: "top-center",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: true,
					progress: undefined,
					theme: "dark",
				})
				localStorage.removeItem("user")
				localStorage.clear()
			})
			.catch(() => {
				// alert("Signout Failed")
				toast.erro("Signout Failed!", {
					position: "top-center",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: true,
					progress: undefined,
					theme: "dark",
				})
			})
	}

	const createNewKanban = () => {
		let yes = confirm("Are you sure you want to create a new Kanban Board")
		if (yes) {
			const id = uid(32)
			router.push("/")
			router.push("/kanban/" + id)
			toggleSidebar(false)
		}
	}
	const createNewPage = () => {
		let yes = confirm("Are you sure you want to create a new Page")
		if (yes) {
			const id = uid(32)
			router.push("/")
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
					} fixed h-screen w-[300px] transition duration-300 bg-customlight dark:bg-gray-800 text-customblack dark:text-white transform z-30`}
				>
					{/* Sidebar */}
					<div className="h-screen flex flex-col p-1.5 overflow-y-auto">
						<div className="flex w-full justify-between items-center h-10">
							<h1 className="text-2xl font-bold p-1.5 cursor-pointer">
								<Link href={"/"}>ExoDocs</Link>
							</h1>
							{/* Mobile menu button */}
							<button
								className="focus:outline-none"
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
							<div className="w-full flex items-center justify-between p-1.5 font-normal rounded-lg border border-slate-800 dark:border-customwhite">
								<div
									title="Profile"
									className="flex cursor-pointer items-center"
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
										className="ml-1 max-w-[200px] lineBreak"
									>
										{userObject.email}
									</Link>
								</div>

								<SignoutButton {...{ handleSignOutClick }} />
							</div>

							<ul className="flex flex-col space-y-1">
								<li>
									<div className="flex items-center">
										<CreateKanbanButon
											{...{ createNewKanban }}
										/>
										<CreatePageButton
											{...{ createNewPage }}
										/>
									</div>
								</li>

								<li>
									<div className="flex items-center p-1.5 text-base font-normal rounded-lg cursor-pointer border border-slate-800 dark:border-customwhite border-b-0 rounded-b-none">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="orange"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="orange"
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
									<ol className="space-y-1 md:space-y-2 p-1.5 rounded-b-lg border border-slate-800 dark:border-customwhite">
										{!dataList.every(
											item => item.favourites === false
										) ||
											(dataList.length <= 0 && (
												<span className="flex items-center justify-center">
													No Favourites Added
												</span>
											))}
										{dataList.map((data, index) => {
											if (data) {
												if (data.slug.length > 0) {
													if (data.favourite) {
														return (
															<SidebarList
																data={data}
																key={index}
																userUid={
																	userObject.uid
																}
															/>
														)
													}
												}
											}
										})}
									</ol>
								</li>
								<li>
									<div className="flex items-center p-1.5 text-base font-normal rounded-lg rounded-b-none dark:text-white border-2 dark:border-black dark:bg-gray-700 cursor-pointer text-slate-800 border-slate-800">
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
									<ol className="space-y-1 border-2 dark:border-black border-t-0 md:space-y-2 p-1.5 dark:bg-gray-700 rounded-b-lg text-slate-800 bg-customwhite border-slate-800">
										{dataList.length <= 0 && (
											<span className="flex text-slate-800 dark:text-customlight items-center justify-center">
												No Pages to show
											</span>
										)}
										{dataList.length >= 1 &&
											dataList.map((data, index) => {
												if (data) {
													if (data.slug.length > 0) {
														return (
															<SidebarList
																data={data}
																key={index}
																userUid={
																	userObject.uid
																}
															/>
														)
													}
												}
											})}
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
