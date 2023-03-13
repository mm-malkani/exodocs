import { onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import LoginFirst from "../components/LoginFirst"
import { auth } from "../config/firebaseConfig"

const Profile = () => {
	const [login, setLogin] = useState(false)
	const [user, setUser] = useState("")
	useEffect(() => {
		onAuthStateChanged(auth, user => {
			if (user) {
				setLogin(true)
				setUser(user)
				// console.log(user)
			} else {
				setLogin(false)
			}
		})
	}, [])

	const resetPassword = () => {
		sendPasswordResetEmail(auth, user.email)
			.then(() => {
				// alert("Password Reset Link Sent to Registered Email Address")
				toast.success(
					"Password Reset Link Sent to Registered Email Address!",
					{
						position: "top-center",
						autoClose: 3000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: false,
						draggable: true,
						progress: undefined,
						theme: "dark",
					}
				)
			})
			.catch(err => {
				console.log(err)
				// alert("Error Occured ! Please Try Again")
				toast.error("Error Occured ! Please Try Again!", {
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

	return (
		<div className="flex w-screen overflow-x-hidden bg-customwhite h-full min-h-[570px] py-2">
			{login && (
				<div className="flex flex-col w-full items-center rounded-lg space-y-2">
					<h2 className="text-center">Profile</h2>
					<div className="border p-1 flex flex-col items-center px-4 max-w-xs space-y-2">
						{user.photoURL && (
							<span className="relative w-[100px] h-[100px] sm:w-[180px] sm:h-[180px] rounded-full">
								<Image
									priority
									fill
									src={user.photoURL}
									alt="Profile Picture"
								/>
							</span>
						)}
						{!user.photoURL && (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="#374151"
								className="w-[100px] h-[100px] sm:w-[180px] sm:h-[180px] rounded-full"
							>
								<path
									fillRule="evenodd"
									d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
									clipRule="evenodd"
								/>
							</svg>
						)}
						<span className="font-semibold">
							{user.displayName}
						</span>
					</div>
					<div className="card flex flex-col bg-customlight font-medium p-2 text-lg rounded">
						<div className="flex">
							<span>Email : {user.email}</span>
						</div>
					</div>
					<div className="flex justify-center">
						<button
							onClick={resetPassword}
							className="cursor-pointer font-medium hover:underline"
						>
							Reset Password
						</button>
					</div>
				</div>
			)}
			{!login && <LoginFirst />}
		</div>
	)
}

export default Profile
