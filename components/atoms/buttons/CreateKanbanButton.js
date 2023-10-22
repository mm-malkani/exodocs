import React from "react"

const CreateKanbanButton = ({ createNewKanban }) => {
	return (
		<button
			onClick={createNewKanban}
			className="flex flex-1 p-1.5 text-base font-normal rounded-lg hover:bg-customwhite  dark:hover:bg-gray-700 cursor-pointer space-x-2 hover:scale-105 transition-all duration-200"
		>
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
					d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
			<span>Kanban</span>
		</button>
	)
}

export default CreateKanbanButton
