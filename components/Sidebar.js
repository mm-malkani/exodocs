import Link from "next/link"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"

const Sidebar = ({ sidebarOpen, userObject }) => {
	const [activeTemplate, setActiveTemplate] = useState("")
	const router = useRouter()
	// console.log(router.pathname);
	useEffect(() => {
		if (router.pathname === "/") {
			setActiveTemplate("pages")
		} else if (router.pathname === "/kanban") {
			setActiveTemplate("kanban")
		}
	}, [router.pathname])

	return (
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
						className={`border-b-2 hover:bg-slate-300 ${
							activeTemplate === "kanban" &&
							"bg-slate-300 border-slate-600"
						} p-1 rounded `}
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

							<span className="flex-1 ml-3">Favourites</span>
						</div>
						<ol className="space-y-1">
							<li>Lorem ipsum dolor sit adsdasd asdasdasd</li>
							<li>Lorem ipsum dolor sit adsdasd asdasdasd</li>
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

							<span className="flex-1 ml-3">All Pages</span>
						</div>
						<ol className="space-y-1">
							<li>Lorem ipsum dolor sit adsdasd asdasdasd</li>
							<li>Lorem ipsum dolor sit adsdasd asdasdasd</li>
							<li>Lorem ipsum dolor sit adsdasd asdasdasd</li>
						</ol>
					</li>
				</ul>
			</div>
		</aside>
	)
}

export default Sidebar
