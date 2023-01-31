import Image from "next/image"
import Link from "next/link"
import React from "react"

const Navbar = ({
	sidebarButtonClicked,
	downMenuClicked,
	handleSignout,
	downMenuOpen,
}) => {
	// console.log(userObject)

	return (
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
								<span className="hidden sm:block">Share</span>

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
	)
}

export default Navbar
