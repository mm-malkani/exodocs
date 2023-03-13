import { ref, set } from "firebase/database"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { toast } from "react-toastify"
import { db } from "../../config/firebaseConfig"

const SidebarList = ({ data, userUid }) => {
	const router = useRouter()

	const deleteFromDatabase = () => {
		// console.log(data.slug.length)
		if (data.slug.length === 32) {
			set(ref(db, `${userUid}/${data.type}/${data.slug}`), null)
				.then(() => {
					// console.log("REMOVED")
				})
				.catch(err => console.log(err))
			// console.log(router.asPath)
			localStorage.removeItem(data.slug)
			if (router.asPath == `/${data.type}/${data.slug}`) {
				router.push("/")
			}
		} else {
			// alert("Error Occured in Deleting Page Please Reload the Page")
			toast.error(
				"Error Occured in Deleting Page Please Reload the Page!",
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
		}
	}

	return (
		<li className="group text-slate-800 dark:text-customwhite flex justify-between items-center cursor-pointer">
			<div className="flex space-x-2 items-center">
				<span className="w-5">
					{data.type == "kanban" && (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1}
							stroke="currentColor"
							className="w-5 h-5"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
							/>
						</svg>
					)}
					{data.type == "pages" && (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-5 h-5"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
							/>
						</svg>
					)}
				</span>

				<Link
					href={`/${data.type}/${data.slug}`}
					title={data.title}
					className="line-clamp-2 max-w-[200px] lineBreak group-hover:scale-105 transition"
				>
					{data.title}
				</Link>
			</div>
			<span
				onClick={() => deleteFromDatabase()}
				title="Delete"
				className="scale-0 group-hover:scale-100"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1}
					stroke="currentColor"
					className="w-5 h-5"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
					/>
				</svg>
			</span>
		</li>
	)
}

export default SidebarList
