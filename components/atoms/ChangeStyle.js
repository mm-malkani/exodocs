import React from "react"
import ListOptions from "../ListOptions"

const ChangeStyle = ({ caret, setCaret, index, convertTagName }) => {
	return (
		<span
			onMouseEnter={() => setCaret(true)}
			title="Change Style"
			onClick={() => setCaret(!caret)}
			className="stylegroup cursor-pointer"
			onMouseLeave={() => setCaret(false)}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className={`invisible group-hover:visible cursor-pointer w-6 h-6`}
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
				/>
			</svg>

			<ListOptions
				{...{
					caret,
					index,
					convertTagName,
				}}
			/>
		</span>
	)
}

export default ChangeStyle
