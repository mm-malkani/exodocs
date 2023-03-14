import {
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
} from "@firebase/auth"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { FcGoogle } from "react-icons/fc"
import { toast } from "react-toastify"
import { auth, provider } from "../config/firebaseConfig"

const Login = () => {
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
	const [password, setPassword] = useState("")

	// console.debug("Hola")

	const handleGoogleClick = () => {
		signInWithPopup(auth, provider)
			.then(user => {
				// console.debug(user)
				// alert("Login Successfull")
				localStorage.setItem("user", JSON.stringify(user))
				toast.success("Log in Success!", {
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
			.catch(err => {
				// alert("Login Failed")
				toast.error("Log in Failed!", {
					position: "top-center",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: true,
					progress: undefined,
					theme: "dark",
				})
				console.error(
					`🚀 ~ file: login.js:39 ~ handleGoogleClick ~ err`,
					err
				)
			})
	}

	const handleLoginClick = () => {
		signInWithEmailAndPassword(auth, email, password)
			.then(user => {
				// console.debug(user)
				// alert("Login Successfull")
				localStorage.setItem("user", JSON.stringify(user))
				toast.success("Log in Success!", {
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
			.catch(err => {
				console.debug(err)
				// alert("Login Failed")
				toast.error("Log in Failed!", {
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
						Log In
					</h1>
					<p className="lg:w-2/3 mx-auto leading-relaxed text-base">
						Please Login To Your Account to continue.
						<br />
						<span>
							Or{" "}
							<Link
								className="text-slate-600 hover:underline"
								href={"/signup"}
							>
								Create an Account
							</Link>
						</span>
					</p>
				</div>
				<div className="lg:w-1/3 md:w-1/2 mx-auto">
					<div className="flex flex-wrap -m-2">
						<div className="p-2 w-full">
							<div className="relative">
								<div
									onClick={handleGoogleClick}
									className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-slate-500 focus:bg-white focus:ring-2 focus:ring-slate-200 text-center outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out flex items-center justify-center cursor-pointer"
								>
									<FcGoogle className="mx-2" />
									Continue with Google
								</div>
							</div>
						</div>
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
						<div className="p-2 w-full">
							<div className="relative">
								<label
									htmlFor="message"
									className="leading-7 text-sm text-gray-600"
								>
									Password
								</label>
								<input
									type="password"
									id="password"
									value={password}
									onChange={e => setPassword(e.target.value)}
									name="email"
									className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-slate-500 focus:bg-white focus:ring-2 focus:ring-slate-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
								/>
							</div>
						</div>
						<div className="p-2 w-full flex justify-around items-center flex-col sm:flex-row space-y-1">
							<button
								onClick={handleLoginClick}
								className="flex text-white bg-slate-500 border-0 py-2 px-8 focus:outline-none hover:bg-slate-600 rounded text-lg"
							>
								Log In
							</button>
							<Link
								className="hover:text-slate-500 transition-all"
								href={"/forgotpassword"}
							>
								Forgot Password
							</Link>
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

export default Login
