import { ref, set } from "firebase/database"
import { useRouter } from "next/router"
import React from "react"
import { db } from "../../config/firebaseConfig"

const DeletePageButton = ({ userUid, type, slug }) => {
	const router = useRouter()

	const deleteFromDatabase = () => {
		// console.log(data.slug.length)
		if (slug.length === 32) {
			set(
				ref(
					db,
					`${userUid}/${
						type == "k" ? "kanban" : type == "p" ? "pages" : ""
					}/${slug}`
				),
				null
			)
				.then(() => {
					// console.log(
					// 	`${userUid}/${
					// 		type == "k" ? "kanban" : type == "p" ? "pages" : ""
					// 	}/${slug}`
					// )
					router.push("/")
					// console.log("REMOVED")
				})
				.catch(err => console.log(err))
		} else {
			alert("Error Occured in Deleting Page Please Reload the Page")
		}
	}

	return (
		<div
			onClick={deleteFromDatabase}
			className="flex items-center justify-between space-x-2 border cursor-pointer py-1 px-2"
		>
			<div className="text-gray-700 font-medium">Delete Page</div>
			<span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-6 h-6 hover:scale-105 transition"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
					/>
				</svg>
			</span>
		</div>
	)
}

export default DeletePageButton
