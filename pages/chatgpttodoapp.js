import React, { useState } from "react"

const TodoApp = () => {
	const [todos, setTodos] = useState([
		{ id: 1, text: "Learn Next.js", isCompleted: false },
		{ id: 2, text: "Build a todo app", isCompleted: false },
		{ id: 3, text: "Publish on GitHub", isCompleted: false },
	])

	const handleAddTodo = text => {
		const newTodos = [
			...todos,
			{ id: todos.length + 1, text, isCompleted: false },
		]
		setTodos(newTodos)
	}

	const handleUpdateTodo = (id, text) => {
		const newTodos = todos.map(todo => {
			if (todo.id === id) {
				todo.text = text
			}
			return todo
		})
		setTodos(newTodos)
	}

	const handleDeleteTodo = id => {
		const newTodos = todos.filter(todo => todo.id !== id)
		setTodos(newTodos)
	}

	return (
		<div>
			<h1>Todo App</h1>
			<input
				type="text"
				placeholder="Add a todo"
				onKeyPress={e => {
					if (e.key === "Enter") {
						handleAddTodo(e.target.value)
						e.target.value = ""
					}
				}}
			/>
			<ul>
				{todos.map(todo => (
					<li key={todo.id}>
						<input
							type="checkbox"
							checked={todo.isCompleted}
							onClick={() => {
								todo.isCompleted = !todo.isCompleted
							}}
							onChange={() =>
								handleUpdateTodo(
									todo.id,
									todo.text,
									todo.isCompleted
								)
							}
						/>
						<input
							type="text"
							value={todo.text}
							onChange={e =>
								handleUpdateTodo(todo.id, e.target.value)
							}
						/>
						<button onClick={() => handleDeleteTodo(todo.id)}>
							x
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}

export default TodoApp
