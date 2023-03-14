import React, { useEffect, useState } from "react"

const DarkModeButton = () => {
	const [darkModeOn, setDarkModeOn] = useState(false)
	useEffect(() => {
		if (window.matchMedia) {
			if (window.matchMedia("(prefers-color-scheme: light)").matches) {
				setDarkModeOn(true)
				document.body.classList.add("dark")
			} else {
				setDarkModeOn(false)
				document.body.classList.remove("dark")
			}
		} else {
			setDarkModeOn(false)
			document.body.classList.remove("dark")
		}
	}, [])
	const handleDarkMode = () => {
		setDarkModeOn(!darkModeOn)
		if (darkModeOn) {
			document.body.classList.remove("dark")
			return
		}
		if (!darkModeOn) {
			document.body.classList.add("dark")
			return
		}
	}

	return (
		<div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between space-y-1 sm:space-x-1">
			<div className="text-gray-700 font-medium">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-6 h-6 dark:text-white"
				>
					{!darkModeOn && (
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
						/>
					)}
					{darkModeOn && (
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
						/>
					)}
				</svg>
			</div>
			<label
				htmlFor="autosave"
				className="flex items-center cursor-pointer"
			>
				<div className="relative">
					<input
						type="checkbox"
						id="autosave"
						checked={darkModeOn}
						onChange={handleDarkMode}
						className="sr-only"
					/>
					<div className="block bg-gray-600 w-10 h-6 rounded-full"></div>
					<div
						className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
							darkModeOn ? "translate-x-4 bg-green-500" : ""
						}`}
					></div>
				</div>
			</label>
		</div>
	)
}

export default DarkModeButton
