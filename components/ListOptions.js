import React from "react"

const ListOptions = ({
	caret,
	index,
	convertToH1,
	convertToH2,
	convertToP,
}) => {
	return (
		<ul
			className={`${
				caret
					? "bg-customlight border w-[150px] rounded h-[110px] absolute flex-col flex"
					: "hidden"
			}`}
		>
			<li
				onClick={() => {
					convertToH1(index)
				}}
				className="cursor-pointer rounded hover:bg-customwhite p-1.5 text-center font-bold"
			>
				Heading 1
			</li>
			<li
				onClick={() => {
					convertToH2(index)
				}}
				className="cursor-pointer rounded hover:bg-customwhite p-1.5 text-center font-semibold"
			>
				Heading 2
			</li>
			<li
				onClick={() => {
					convertToP(index)
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
