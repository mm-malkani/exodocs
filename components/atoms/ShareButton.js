import Link from "next/link"
import React from "react"
import { RiWhatsappFill } from "react-icons/ri"
import { toast } from "react-toastify"

const ShareButton = ({ userUid, type, slug }) => {
	let host = "https://exodocs.vercel.app"
	let text = `${host}/shared/${type}/${slug}-${userUid}`

	const handleShareClick = async () => {
		let text = `${host}/shared/${type}/${slug}-${userUid}`
		try {
			await navigator.clipboard.writeText(text)
			// console.debug("Content copied to clipboard")
			// alert(`Link Copied to Clipboard`)
			toast.success("Link Copied to Clipboard!", {
				position: "top-center",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
				theme: "dark",
			})
		} catch (err) {
			console.error("Failed to copy: ", err)
		}
		// console.debug(userUid, type, slug)
		// console.debug(`${host}/shared/${type}/${slug}-${userUid}`)
	}

	const handleLinkShare = () => {
		let text = `${host}/shared/${type}/${slug}-${userUid}`
		window.open(text, "_blank")
	}

	return (
		<button className="flex items-center justify-between text-gray-700 font-medium space-x-2 outline-none bg-customlight py-1 px-2 transition-all duration-200 rounded">
			<span>Share</span>
			<div className="flex space-x-1">
				<span
					title="Copy Link"
					onClick={handleShareClick}
				>
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
							d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
						/>
					</svg>
				</span>
				<span>
					<svg
						onClick={handleLinkShare}
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
							d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
						/>
					</svg>
				</span>
				<Link
					href={`whatsapp://send?text=${text}`}
					data-action="share/whatsapp/share"
					title="Share to WhatsApp"
				>
					<RiWhatsappFill
						className="w-6 h-6 hover:scale-105 transition"
						fill="green"
					/>
				</Link>
			</div>
		</button>
	)
}

export default ShareButton
