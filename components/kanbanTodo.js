import React from "react"

const KanbanTodo = ({
	todoData,
	deleteTodoItem,
	columnIndex,
	todoIndex,
	forwardColumnClicked,
	backColumnClicked,
	dragStartHandle,
	dragEnterHandle,
	dragEndHandle,
	fillColor,
}) => {
	return (
		<div
			draggable
			onDragStart={e => dragStartHandle(e, columnIndex, todoIndex)}
			onDragEnter={e => dragEnterHandle(e, columnIndex, todoIndex)}
			onDragEnd={e => dragEndHandle(e, columnIndex)}
			onDragOver={e => {
				e.preventDefault()
			}}
			className="flex p-4 space-y-2 rounded hover:scale-105 hover:cursor-pointer transition-all duration-200"
		>
			<div
				className={`flex p-4 w-full rounded border-2 border-customgray text-customblack flex-col `}
			>
				<div className="flex flex-wrap justify-between w-full">
					<div className="flex space-x-2 items-center">
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

						<h6 className="text-md">{todoData.todoHeading}</h6>
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
							className="w-6 h-6 cursor-pointer"
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
						<svg
							// onClick={() => {
							// 	handleEditTodoClick(columnIndex, todoIndex)
							// }}
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6 cursor-pointer"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
							/>
						</svg>

						{/* ----------------------DELETE TODO ICON------------------- */}
						<svg
							onClick={() => {
								deleteTodoItem(columnIndex, todoData.todoId)
							}}
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6 cursor-pointer"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
							/>
						</svg>
					</div>
				</div>
				<div className="flex flex-col w-full mt-2">
					<p>{todoData.todoDescription}</p>
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

							<span className="text-sm">
								{todoData.todoUpdateTime}
							</span>
						</div>

						<div className="flex space-x-2">
							{/* ----------------------BACKWARD COLUMN ICON------------------- */}

							{columnIndex !== 0 && (
								<svg
									onClick={() => {
										backColumnClicked(
											columnIndex,
											todoIndex
										)
									}}
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="rotate-180 w-6 h-6 cursor-pointer z-0"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							)}

							{/* ----------------------FORWARD COLUMN ICON------------------- */}
							<svg
								onClick={() => {
									forwardColumnClicked(columnIndex, todoIndex)
								}}
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6 cursor-pointer z-0"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default KanbanTodo
