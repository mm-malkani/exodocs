import React from "react"
import { Draggable, Droppable } from "react-beautiful-dnd"

const Column = ({ column, tasks }) => {
	return (
		<div className="flex flex-col bg-slate-800 text-neutral-200 w-[400px] h-[600px] rounded">
			<div className="flex bg-slate-900 items-center h-[60px] w-full px-2 rounded">
				<h1 className="text-xl">{column.title}</h1>
			</div>
			<Droppable droppableId={column.id}>
				{(droppableProvided, droppableSnapshot) => (
					<div
						className="flex flex-1 flex-col px-2 py-1 space-y-2"
						ref={droppableProvided.innerRef}
						{...droppableProvided.droppableProps}
					>
						{tasks.map((task, index) => (
							<Draggable
								key={task.id}
								draggableId={`${task.id}`}
								index={index}
							>
								{(draggableProvided, draggableSnapshot) => (
									<div
										className="flex bg-slate-600 h-fit w-full p-4 rounded"
										ref={draggableProvided.innerRef}
										{...draggableProvided.draggableProps}
										{...draggableProvided.dragHandleProps}
									>
										<p>{task.content}</p>
										{draggableProvided.placeholder}
									</div>
								)}
							</Draggable>
						))}
						{droppableProvided.placeholder}
					</div>
				)}
			</Droppable>
		</div>
	)
}

export default Column
