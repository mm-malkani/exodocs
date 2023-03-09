import React from "react"

const ShareButton = ({ userUid, type, slug }) => {
	const handleShareClick = async () => {
		let host = "https://exodocs.vercel.app"
		let text = `${host}/shared/${type}/${slug}-${userUid}`
		try {
			await navigator.clipboard.writeText(text)
			// console.log("Content copied to clipboard")
			alert(`Link Copied to Clipboard`)
			window.open(text, "_blank")
		} catch (err) {
			console.error("Failed to copy: ", err)
		}
		// console.log(userUid, type, slug)
		// console.log(`${host}/shared/${type}/${slug}-${userUid}`)
	}

	return (
		<button
			onClick={handleShareClick}
			className="flex items-center justify-between text-gray-700 font-medium space-x-2 outline-none hover:bg-customlight py-1 px-2 transition-all duration-200 rounded"
		>
			<span>Share</span>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className="w-6 h-6"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
				/>
			</svg>
		</button>
	)
}

export default ShareButton
