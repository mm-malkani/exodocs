import dynamic from "next/dynamic"
import React, { useState } from "react"
import { DragDropContext } from "react-beautiful-dnd"
const Column = dynamic(() => import("./Column"), { ssr: false })

const KanbanTemplate = () => {
	const initialData = {
		tasks: {
			1: { id: 1, content: "Configure Next.js application" },
			2: { id: 2, content: "Configure Next.js and tailwind " },
			3: { id: 3, content: "Create sidebar navigation menu" },
			4: { id: 4, content: "Create page footer" },
			5: { id: 5, content: "Create page navigation menu" },
			6: { id: 6, content: "Create page layout" },
		},
		columns: {
			"column-1": {
				id: "column-1",
				title: "TO-DO",
				taskIds: [1, 2, 3, 4, 5, 6],
			},
			"column-2": {
				id: "column-2",
				title: "IN-PROGRESS",
				taskIds: [],
			},
			"column-3": {
				id: "column-3",
				title: "COMPLETED",
				taskIds: [],
			},
		},
		// Facilitate reordering of the columns
		columnOrder: ["column-1", "column-2", "column-3"],
	}
	const [state, setState] = useState(initialData)

	const reorderColumnList = (sourceCol, startIndex, endIndex) => {
		const newTaskIds = Array.from(sourceCol.taskIds)
		const [removed] = newTaskIds.splice(startIndex, 1)
		newTaskIds.splice(endIndex, 0, removed)

		const newColumn = {
			...sourceCol,
			taskIds: newTaskIds,
		}

		return newColumn
	}

	const onDragEnd = result => {
		const { destination, source } = result
		if (!destination) return

		if (
			destination.droppableId === source.droppableId ||
			destination.index === source.index
		) {
			return
		}

		const sourceColumn = state.columns[source.droppableId]
		const destinationColumn = state.columns[destination.droppableId]

		if (sourceColumn.id === destinationColumn.id) {
			const newColumn = reorderColumnList(
				sourceColumn,
				source.index,
				destination.index
			)

			const newState = {
				...state,
				columns: {
					...state.columns,
					[newColumn.id]: newColumn,
				},
			}
			setState(newState)
			return
		}

		const startTaskIds = Array.from(sourceColumn.taskIds)
		const [removed] = startTaskIds.splice(source.index, 1)
		const newStartCol = {
			...sourceColumn,
			taskIds: startTaskIds,
		}

		const endTaskIds = Array.from(destinationColumn.taskIds)
		endTaskIds.splice(destination.index, 0, removed)
		const newEndCol = {
			...destinationColumn,
			taskIds: endTaskIds,
		}

		const newState = {
			...state,
			columns: {
				...state.columns,
				[newStartCol.id]: newStartCol,
				[newEndCol.id]: newEndCol,
			},
		}
		setState(newState)
	}

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<h1 className="text-center text-xl sm:text-2xl overflow-y-auto">
				Kanban Board
			</h1>

			<div className="flex rounded">
				<div className="flex justify-center space-x-3 rounded">
					{state.columnOrder.map(columnId => {
						const column = state.columns[columnId]
						const tasks = column.taskIds.map(
							taskId => state.tasks[taskId]
						)

						return (
							<Column
								key={column.id}
								column={column}
								tasks={tasks}
							></Column>
						)
					})}
				</div>
			</div>
		</DragDropContext>
	)
}

export default KanbanTemplate
