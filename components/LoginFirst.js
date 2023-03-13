import React from "react"
import LoginButton from "./atoms/LoginButton"

const LoginFirst = () => {
	return (
		<main className="flex-1 overflow-y-auto">
			{/* Navbar */}

			{/* Content section */}
			<div className="p-4">
				<h1 className="text-2xl text-center font-bold mb-4 flex flex-col sm:flex-row space-x-2 justify-center items-center space-y-2">
					<span>You must Login First</span>
					<LoginButton />
				</h1>
				{/* Content section content goes here */}
			</div>
		</main>
	)
}

export default LoginFirst
