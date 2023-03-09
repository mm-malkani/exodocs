import React from "react"

const AddElement = ({ index, handleAddElement }) => {
	return (
		<span
			title="Add Element"
			className="cursor-pointer"
			onClick={() => {
				handleAddElement(index)
			}}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className={`hidden group-hover:block cursor-pointer w-6 h-6`}
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M12 4.5v15m7.5-7.5h-15"
				/>
			</svg>
		</span>
	)
}

export default AddElement
