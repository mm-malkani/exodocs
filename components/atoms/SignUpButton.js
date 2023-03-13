import Link from "next/link"
import React from "react"

const SignUpButton = () => {
	return (
		<Link
			href={"/signup"}
			className="inline-flex items-center bg-slate-200 border dark:border-0 py-1 px-1 sm:px-2 md:px-3 focus:outline-none dark:bg-slate-300 dark:hover:bg-slate-200 dark:text-slate-800 rounded text-sm sm:text-base mt-0"
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
	)
}

export default SignUpButton
