import React, { useEffect, useState } from "react"
import { uid } from "uid"
import EditModal from "./EditModal"
import ModalTemplate from "./ModalTemplate"
import TodoTemplate from "./TodoTemplate"
import ViewModal from "./ViewModal"

const KanbanTemplate = () => {
	const [modalVisible, setModalVisible] = useState(false)
	const [editModalVisible, setEditModalVisible] = useState(false)
	const [viewModalVisible, setViewModalVisible] = useState(false)
	const timestamp = Date().toString().slice(0, -30)
	const [todoCreationTime, setTodoCreationTime] = useState("")
	const [todoTitle, setTodoTitle] = useState("")
	const [todoDescription, setTodoDescription] = useState("")
	const [labelColor, setLabelColor] = useState("yellow")
	const [allTodoInfo, setAllTodoInfo] = useState("")
	const initialData = [
		{
			columnId: uid(),
			columnName: "Todo",
			columnData: [
				{
					todoId: uid(),
					todoHeading: "Task 1",
					todoDescription:
						"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam nam itaque dolorem.",
					todoCreationTime: "Wed Jan 01 2023 23:16:48",
					todoUpdateTime: "Wed Feb 01 2023 23:16:48",
					todoLabel: "red",
				},
				{
					todoId: uid(),
					todoHeading: "Task 2",
					todoDescription:
						"Lorem ipsum dolor, sit amet nam itaque dolorem.",
					todoCreationTime: "Wed Dec 27 2022 23:16:48",
					todoUpdateTime: "Wed Feb 01 2023 23:16:48",
					todoLabel: "green",
				},
			],
		},
		{
			columnId: uid(),
			columnName: "In-Progress",
			columnData: [
				{
					todoId: uid(),
					todoHeading: "Task 3",
					todoDescription:
						"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam nam itaque.",
					todoCreationTime: "Wed Mar 16 2022 23:16:48",
					todoUpdateTime: "Wed Feb 01 2023 23:16:48",
					todoLabel: "yellow",
				},
			],
		},
	]

	const [dataStore, setDataStore] = useState([])
	const [currentIndex, setCurrentIndex] = useState("")
	const [currentTodoId, setCurrentTodoId] = useState("")

	useEffect(() => {
		setDataStore(initialData)
		// setTemporaryDataStore(dataStore)
	}, [setDataStore])

	// ---------------------- FUNCTIONING OF COLUMN RELATED ADD/DELETE COLUMN FORWARD/BACK COLUMN

	// ------------ ADD COLUMN
	const addNewColumn = () => {
		const name = prompt("Enter Column Name")
		if (name) {
			const newColumn = {
				columnId: uid(),
				columnName: name,
				columnData: [],
			}
			setDataStore([...dataStore, newColumn])
		}
	}

	// ------------ DELETE COLUMN
	const deleteColumn = index => {
		setDataStore(dataStore.filter((_, i) => i !== index))
	}

	// ------------ FORWARD TODO IN COLUMNS
	const forwardColumnClicked = (columnIndex, todoIndex) => {
		// console.log(dataStore.length, columnIndex)
		if (dataStore.length === columnIndex + 1) {
			alert("Can't Find Next Column")
			return
		} else {
			try {
				let tempDataStore = [...dataStore]
				let dataToBeMoved =
					tempDataStore[columnIndex].columnData[todoIndex]
				tempDataStore[columnIndex].columnData.splice(todoIndex, 1)
				tempDataStore[columnIndex + 1].columnData.push(dataToBeMoved)
				setDataStore(tempDataStore)
			} catch (error) {
				console.log(error)
			}
		}
	}

	// ------------ BACK TODO IN COLUMNS
	const backColumnClicked = (columnIndex, todoIndex) => {
		let tempDataStore = [...dataStore]
		let dataToBeMoved = tempDataStore[columnIndex].columnData[todoIndex]
		tempDataStore[columnIndex].columnData.splice(todoIndex, 1)
		tempDataStore[columnIndex - 1].columnData.push(dataToBeMoved)
		setDataStore(tempDataStore)
	}

	//  --------------------- FUNCITONING OF TODO RELATED ADD/VIEW/UPDATE/DELETE

	// -------------- ADD TODO
	const addTodoToData = index => {
		let tempDataStore = dataStore
		const newTodoData = {
			todoId: uid(),
			todoHeading: todoTitle,
			todoDescription: todoDescription,
			todoCreationTime: timestamp,
			todoUpdateTime: "Haven't Updated Yet",
			todoLabel: labelColor,
		}
		// console.log(tempDataStore);
		tempDataStore[index].columnData.push(newTodoData)
		setDataStore(tempDataStore)
		setModalVisible(false)
		setTodoTitle("")
		setTodoDescription("")
		setLabelColor("yellow")
	}

	const handleAddTodo = currentIndex => {
		setCurrentIndex(currentIndex)
	}

	// -------------- VIEW TODO
	const viewTodoInfo = (columnIndex, todoIndex) => {
		// console.log(columnIndex, todoIndex)
		let tempDataStore = [...dataStore]
		setAllTodoInfo(tempDataStore[columnIndex].columnData[todoIndex])
		// console.log(allTodoInfo);
		setViewModalVisible(true)
	}

	// -------------- UPDATE TODO
	const updateTodoToData = (todoTitleValue, todoDescriptionValue) => {
		// console.log(todoTitleValue, todoDescriptionValue, labelColor);
		let tempDataStore = [...dataStore]
		tempDataStore[currentIndex].columnData[currentTodoId] = {
			todoId: uid(),
			todoHeading: todoTitleValue,
			todoDescription: todoDescriptionValue,
			todoCreationTime: todoCreationTime,
			todoUpdateTime: timestamp,
			todoLabel: labelColor,
		}
		setDataStore(tempDataStore)
		setEditModalVisible(false)
		setTodoTitle("")
		setTodoDescription("")
		setTodoCreationTime("")
	}

	const handleEditTodoClick = (columnIndex, todoIndex) => {
		setTodoTitle(dataStore[columnIndex].columnData[todoIndex].todoHeading)
		setTodoDescription(
			dataStore[columnIndex].columnData[todoIndex].todoDescription
		)
		setTodoCreationTime(
			dataStore[columnIndex].columnData[todoIndex].todoCreationTime
		)
		setCurrentIndex(columnIndex)
		setCurrentTodoId(todoIndex)
		setEditModalVisible(true)
	}

	// -------------- DELETE TODO
	const deleteTodoItem = (columnIndex, todoId) => {
		let tempDataStore = [...dataStore]
		tempDataStore[columnIndex].columnData = tempDataStore[
			columnIndex
		].columnData.filter(todo => todo.todoId != todoId)
		setDataStore(tempDataStore)
	}

	return (
		<div className="flex flex-col bg-slate-100 space-y-4 justify-center items-center">
			<div className="flex space-x-4 items-center">
				<h1 className="text-center text-xl sm:text-3xl text-purple-900">
					Kanban Board
				</h1>

				<h1
					className="text-center text-xl text-purple-900 flex items-center justify-center bg-slate-300 p-2 rounded cursor-pointer"
					onClick={addNewColumn}
				>
					<svg
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
							d="M12 4.5v15m7.5-7.5h-15"
						/>
					</svg>{" "}
					Add a Column
				</h1>
			</div>

			{modalVisible && (
				<ModalTemplate
					setModalVisible={setModalVisible}
					addTodoToData={addTodoToData}
					currentIndex={currentIndex}
					setTodoTitle={setTodoTitle}
					setTodoDescription={setTodoDescription}
					todoTitle={todoTitle}
					todoDescription={todoDescription}
					labelColor={labelColor}
					setLabelColor={setLabelColor}
				></ModalTemplate>
			)}
			{editModalVisible && (
				<EditModal
					setEditModalVisible={setEditModalVisible}
					updateTodoToData={updateTodoToData}
					todoTitle={todoTitle}
					todoDescription={todoDescription}
					labelColor={labelColor}
					setLabelColor={setLabelColor}
				></EditModal>
			)}
			{viewModalVisible && (
				<ViewModal
					setViewModalVisible={setViewModalVisible}
					allTodoInfo={allTodoInfo}
				></ViewModal>
			)}

			<div className="flex flex-row space-x-4 w-full min-h-fit">
				{dataStore.map((column, index) => {
					return (
						<div
							className="w-[300px] rounded md:w-1/3 h-fit bg-slate-100 border flex flex-col"
							key={index}
						>
							<h1 className="text-center h-12 rounded bg-slate-600 w-full flex items-center justify-between px-4 text-neutral-300 text-xl">
								{column.columnName}
								<div className="flex space-x-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-6 h-6 cursor-pointer"
										onClick={() => {
											setModalVisible(true)
											handleAddTodo(index)
										}}
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>

									<svg
										onClick={() => {
											deleteColumn(index)
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
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</div>
							</h1>

							{column.columnData.length > 0 &&
								column.columnData.map((todoData, todoIndex) => {
									return (
										<TodoTemplate
											todoIndex={todoIndex}
											columnIndex={index}
											key={todoIndex}
											todoLabel={todoData.todoLabel}
											todoHeading={todoData.todoHeading}
											todoDescription={
												todoData.todoDescription
											}
											todoUpdateTime={
												todoData.todoUpdateTime
											}
											todoId={todoData.todoId}
											handleEditTodoClick={
												handleEditTodoClick
											}
											deleteTodoItem={deleteTodoItem}
											setCurrentIndex={setCurrentIndex}
											setCurrentTodoId={setCurrentTodoId}
											forwardColumnClicked={
												forwardColumnClicked
											}
											backColumnClicked={
												backColumnClicked
											}
											viewTodoInfo={viewTodoInfo}
										></TodoTemplate>
									)
								})}
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default KanbanTemplate

// const updateTodoToData = (currentIndex) => {
// 	let tempDataStore = dataStore;
// 	tempDataStore[currentIndex].columnData[currentTodoId] = updatedTodoData
// 	setDataStore(tempDataStore)
// 	setEditModalVisible(false)
// 	setTodoTitle("")
// 	setTodoDescription("")
// 	setLabelColor("yellow")
// 	console.log(dataStore[currentIndex].columnData[currentTodoId])
// }

// const handleEditTodoClick = (columnIndex, todoId) => {
// 	// console.log("EDIT TODO CLICKED");
// 	setEditModalVisible(true)
// 	setTodoTitle(`${dataStore[columnIndex].columnData[todoId].todoHeading}`)
// 	setTodoDescription(`${dataStore[columnIndex].columnData[todoId].todoDescription}`)
// 	setUpdatedTodoData({
// 		todoId: uid(),
// 		todoHeading: todoTitle,
// 		todoDescription: todoDescription,
// 		todoUpdateTime: timestamp,
// 		todoLabel: labelColor,
// 	})
// }
