import React, { useState } from "react"

const KanbanLists = () => {
	const [tasks, setTasks] = useState([
		{ id: 1, title: "Task 1", status: "todo" },
		{ id: 2, title: "Task 2", status: "in-progress" },
		{ id: 3, title: "Task 3", status: "done" },
	])

	const handleDrag = (task, status) => {
		const updatedTasks = tasks.map(t => {
			if (t.id === task.id) {
				t.status = status
			}
			return t
		})
		setTasks(updatedTasks)
	}

	return (
		<div className="flex">
			<div className="w-full md:w-1/3 p-3 border rounded bg-slate-300">
				<div className="bg-grey-lightest p-3">
					<h2 className="text-lg font-medium mb-3">To Do</h2>
					{tasks
						.filter(task => task.status === "todo")
						.map(task => (
							<div
								key={task.id}
								className="bg-white rounded p-3 mb-3 cursor-pointer"
								onDrag={() => handleDrag(task, "in-progress")}
							>
								{task.title}
							</div>
						))}
				</div>
			</div>
			<div className="w-full md:w-1/3 p-3 border rounded bg-yellow-300">
				<div className="bg-grey-lightest p-3">
					<h2 className="text-lg font-medium mb-3">In Progress</h2>
					{tasks
						.filter(task => task.status === "in-progress")
						.map(task => (
							<div
								key={task.id}
								className="bg-white rounded p-3 mb-3 cursor-pointer"
								onDrag={() => handleDrag(task, "done")}
							>
								{task.title}
							</div>
						))}
				</div>
			</div>
			<div className="w-full md:w-1/3 p-3 border rounded bg-green-300">
				<div className="bg-grey-lightest p-3">
					<h2 className="text-lg font-medium mb-3">Done</h2>
					{tasks
						.filter(task => task.status === "done")
						.map(task => (
							<div
								key={task.id}
								className="bg-white rounded p-3 mb-3 cursor-pointer"
							>
								{task.title}
							</div>
						))}
				</div>
			</div>
		</div>
	)
}

export default KanbanLists
