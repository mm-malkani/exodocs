import { onAuthStateChanged, sendPasswordResetEmail } from "@firebase/auth"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { auth } from "../config/firebaseConfig"

const ForgotPassword = () => {
	const router = useRouter()
	useEffect(() => {
		onAuthStateChanged(auth, user => {
			if (user) {
				localStorage.setItem("user", JSON.stringify(user))
				router.push("/")
			}
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	const [email, setEmail] = useState("")

	const sendResetLink = () => {
		sendPasswordResetEmail(auth, email)
			.then(() => {
				setEmail("")
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
		<section className="text-gray-600 body-font relative">
			<div className="container px-5 py-4 mx-auto">
				<div className="flex flex-col text-center w-full mb-12">
					<h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
						Forgot Password
					</h1>
					<p className="lg:w-2/3 mx-auto leading-relaxed text-base">
						Please Enter Your Email Address to send Password reset
						link.
					</p>
				</div>
				<div className="lg:w-1/3 md:w-1/2 mx-auto">
					<div className="flex flex-wrap -m-2">
						<div className="p-2 w-full">
							<div className="relative">
								<label
									htmlFor="email"
									className="leading-7 text-sm text-gray-600"
								>
									Email
								</label>
								<input
									type="email"
									value={email}
									onChange={e => setEmail(e.target.value)}
									id="email"
									name="email"
									className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-slate-500 focus:bg-white focus:ring-2 focus:ring-slate-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
								/>
							</div>
						</div>

						<div className="p-2 w-full flex justify-around items-center">
							<button
								onClick={sendResetLink}
								className="flex text-white bg-slate-500 border-0 py-2 px-8 focus:outline-none hover:bg-slate-600 rounded text-lg"
							>
								Send Reset Link
							</button>
						</div>
						<div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
							<p className="leading-normal my-5">
								All Rights Reserved
								<br />
								ExoDocs &copy; 2023
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default ForgotPassword
