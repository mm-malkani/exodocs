import Link from "next/link"
import React from "react"

const LoginFirst = () => {
	return (
		<main className="flex-1 overflow-y-auto">
			{/* Navbar */}

			{/* Content section */}
			<div className="p-4">
				<h1 className="text-2xl text-center font-bold mb-4 flex space-x-2 justify-center">
					<span>You must Login First</span>
					<Link
						href={"/login"}
						className="inline-flex items-center border-0 px-3 focus:outline-none bg-slate-200 rounded text-base font-normal mt-0"
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
				</h1>
				{/* Content section content goes here */}
			</div>
		</main>
	)
}

export default LoginFirst
