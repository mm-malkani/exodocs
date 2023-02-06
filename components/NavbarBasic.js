import Image from "next/image"
import Link from "next/link"
import React from "react"

const NavbarBasic = () => {
	return (
		<header className="text-slate-600 body-font">
			<div className="container mx-auto flex flex-wrap px-4 py-2 flex-col md:flex-row justify-between items-center">
				<Link
					href={"/"}
					className="flex title-font font-medium items-center text-slate-900 mb-4 md:mb-0"
				>
					<Image
						alt="ExoDocs Logo"
						src={"/exoDocsLogo-Removed.png"}
						width={150}
						height={40}
					></Image>
				</Link>
				{/* <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                    <a className="mr-5 hover:text-slate-900">First Link</a>
                    <a className="mr-5 hover:text-slate-900">Second Link</a>
                    <a className="mr-5 hover:text-slate-900">Third Link</a>
                    <a className="mr-5 hover:text-slate-900">Fourth Link</a>
                </nav> */}
				<div className="space-x-2">
					<Link
						href={"/login"}
						className="inline-flex items-center bg-slate-100 border-0 py-1 px-3 focus:outline-none hover:bg-slate-200 rounded text-base mt-4 md:mt-0"
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
						className="inline-flex items-center bg-slate-100 border-0 py-1 px-3 focus:outline-none hover:bg-slate-200 rounded text-base mt-4 md:mt-0"
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
			</div>
			<hr />
		</header>
	)
}

export default NavbarBasic
