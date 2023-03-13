import React from "react"

const ListOptions = ({ caret, index, convertTagName }) => {
	return (
		<ul
			className={`${
				caret
					? "bg-customlight border w-[150px] rounded h-[150px] absolute flex-col flex"
					: "hidden"
			}`}
		>
			<li
				onClick={() => {
					convertTagName(index, "h2")
				}}
				className="cursor-pointer rounded hover:bg-customwhite p-1.5 text-center font-bold"
			>
				Heading 1
			</li>
			<li
				onClick={() => {
					convertTagName(index, "h3")
				}}
				className="cursor-pointer rounded hover:bg-customwhite p-1.5 text-center font-bold"
			>
				Heading 2
			</li>
			<li
				onClick={() => {
					convertTagName(index, "h4")
				}}
				className="cursor-pointer rounded hover:bg-customwhite p-1.5 text-center font-semibold"
			>
				Sub-Heading
			</li>
			<li
				onClick={() => {
					convertTagName(index, "p")
				}}
				className="cursor-pointer rounded hover:bg-customwhite p-1.5
                            text-center"
			>
				Paragraph
			</li>
		</ul>
	)
}

export default ListOptions
