import React from "react"

const SharedKanbanTodo = ({
	todoHeading,
	todoDescription,
	todoUpdateTime,
	fillColor,
}) => {
	return (
		<div className="flex p-4 space-y-2 rounded hover:scale-105 hover:cursor-default transition-all duration-200">
			<div
				className={`flex p-4 w-full rounded border-2 border-customgray text-customblack flex-col `}
			>
				<div className="flex flex-wrap justify-between w-full">
					<div className="flex space-x-2 items-center w-10/12">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill={fillColor}
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
							/>
						</svg>

						<h6 className="text-md w-4/5 line-clamp-1">
							{todoHeading}
						</h6>
					</div>
					<div className="flex space-x-2 flex-wrap">
						{/* ----------------------VIEW TODO ICON------------------- */}
						<svg
							// onClick={() => {
							// 	viewTodoInfo(columnIndex, todoIndex)
							// }}
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6 cursor-default"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
							/>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
							/>
						</svg>

						{/* ----------------------EDIT TODO ICON------------------- */}

						{/* ----------------------DELETE TODO ICON------------------- */}
					</div>
				</div>
				<div className="flex flex-col w-full mt-2">
					<p className="w-full lineBreak">{todoDescription}</p>
					<div className="flex justify-between mt-2 items-center">
						<div className="flex items-center space-x-2">
							{/* CLOCK ICON SVG */}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-4 h-4"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>

							<span className="text-sm">{todoUpdateTime}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SharedKanbanTodo
