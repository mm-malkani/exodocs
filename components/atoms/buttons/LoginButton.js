import Link from "next/link"
import React from "react"

const LoginButton = () => {
	return (
		<Link
			href={"/login"}
			className="inline-flex justify-center items-center bg-slate-200 border dark:border-0 py-1 px-1 sm:px-2 md:px-3 focus:outline-none dark:bg-slate-300 dark:text-slate-800 dark:hover:bg-slate-200 rounded text-sm sm:text-base mt-0 max-w-[85px]"
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
	)
}

export default LoginButton
