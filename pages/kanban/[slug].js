import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { uid } from "uid"
import KanbanTodo from "../../components/kanbanTodo"
import ModalTemplate from "../../components/ModalTemplate"

const dataBase = {
	"2293e6d7fe6541a3928ce540b6a06740": {
		title: "Editable title",
		kanban: [
			{
				columnId: uid(),
				columnName: "Not Started",
				columnData: [
					{
						todoId: uid(),
						todoHeading: "Task 1",
						todoDescription:
							"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam nam itaque dolorem.",
						todoCreationTime: "Wed Jan 01 2023 23:16:48",
						todoUpdateTime: "Haven't Updated Yet",
						todoLabel: "red",
					},
					{
						todoId: uid(),
						todoHeading: "Task 2",
						todoDescription:
							"Lorem ipsum dolor, sit amet nam itaque dolorem.",
						todoCreationTime: "Wed Dec 27 2022 23:16:48",
						todoUpdateTime: "Wed Feb 01 2023 23:16:48",
						todoLabel: "red",
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
			{
				columnId: uid(),
				columnName: "Completed",
				columnData: [
					{
						todoId: uid(),
						todoHeading: "Task 4",
						todoDescription:
							"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam nam itaque.",
						todoCreationTime: "Wed Mar 16 2022 23:16:48",
						todoUpdateTime: "Wed Feb 01 2023 23:16:48",
						todoLabel: "green",
					},
				],
			},
		],
	},
}

const Kanban = () => {
	const router = useRouter()

	const [initialData, setinitialData] = useState(
		dataBase["2293e6d7fe6541a3928ce540b6a06740"]
	)

	useEffect(() => {
		const { slug } = router.query
		// console.log(slug);
		if (!localStorage.getItem(slug)) {
			localStorage.setItem(slug, JSON.stringify(initialData))
		}
	}, [router])

	const sendToLocalStorage = () => {
		const { slug } = router.query
		let tempInitialData = { ...initialData }
		tempInitialData.kanban = [...dataStore]
		setinitialData(tempInitialData)
		localStorage.setItem(slug, JSON.stringify(initialData))
	}

	const [dataStore, setDataStore] = useState(initialData.kanban)
	const [currentIndex, setCurrentIndex] = useState("")
	const [modalVisible, setModalVisible] = useState(false)
	const [currentTodoId, setCurrentTodoId] = useState("")
	const [editableTitle, setEditableTitle] = useState(initialData.title)
	const [todoTitle, setTodoTitle] = useState("")
	const [todoDescription, setTodoDescription] = useState("")
	const [labelColor, setLabelColor] = useState("yellow")

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
			sendToLocalStorage()
		}
	}

	// ------------ DELETE COLUMN
	const deleteColumn = index => {
		setDataStore(dataStore.filter((_, i) => i !== index))
		sendToLocalStorage()
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
				sendToLocalStorage()
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
		sendToLocalStorage()
	}

	//  --------------------- FUNCITONING OF TODO RELATED ADD/VIEW/UPDATE/DELETE

	// -------------- ADD TODO
	const addTodoToData = () => {
		const timestamp = Date().toString().slice(0, -30)
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
		tempDataStore[0].columnData.splice(0, 0, newTodoData)
		setDataStore(tempDataStore)
		sendToLocalStorage()
		setModalVisible(false)
		setTodoTitle("")
		setTodoDescription("")
		setLabelColor("yellow")
	}

	const handleAddTodo = () => {
		setCurrentIndex(0)
		setModalVisible(true)
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
		const timestamp = Date().toString().slice(0, -30)
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
		sendToLocalStorage()
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
		sendToLocalStorage()
	}

	// -----------------------------------------DRAG AND DROP FUNCTIONS
	let todoitemDrag = useRef()
	let todoitemDragOver = useRef()
	let dragOverColumnIndex

	const dragStartHandle = (e, columnIndex, todoIndex) => {
		todoitemDrag.current = todoIndex
	}

	const dragEnterHandle = (e, columnIndex, todoIndex) => {
		todoitemDragOver.current = todoIndex
		dragOverColumnIndex = columnIndex
		// console.log(columnIndex)
	}

	const dragEndHandle = (e, columnIndex) => {
		// console.log(e.screenX)
		let tempDataStore = [...dataStore]
		let todoItemMain =
			tempDataStore[columnIndex].columnData[todoitemDrag.current]
		tempDataStore[columnIndex].columnData.splice(todoitemDrag.current, 1)
		try {
			tempDataStore[dragOverColumnIndex].columnData.splice(
				todoitemDragOver.current,
				0,
				todoItemMain
			)
			todoitemDrag.current = null
			todoitemDragOver.current = null
			dragOverColumnIndex = null
			setDataStore(tempDataStore)
			sendToLocalStorage()
		} catch (err) {
			console.log(err)
		}
	}

	// sendToLocalStorage()

	const handleEditableTitle = e => {
		let tempInitialData = { ...initialData }
		setEditableTitle(e.target.value)
		// console.log(tempDataStore);
		tempInitialData.title = editableTitle
		setinitialData(tempInitialData)
		sendToLocalStorage()
	}

	return (
		<>
			<div className="w-screen flex justify-center">
				{modalVisible && (
					<ModalTemplate
						{...{
							setModalVisible,
							addTodoToData,
							setTodoTitle,
							setTodoDescription,
							setLabelColor,
							todoTitle,
							todoDescription,
						}}
					></ModalTemplate>
				)}
			</div>
			<div className="p-2 h-screen bg-customlight text-customblack">
				<div className="flex space-x-2 justify-between">
					<input
						className="font-semibold p-1 text-2xl rounded bg-customwhite w-1/2"
						onChange={e => handleEditableTitle(e)}
						value={editableTitle}
					></input>
					<button className="border-customblack border rounded px-2 bg-lime-600 hover:bg-green text-customwhite transition-all duration-150">
						Publish
					</button>
				</div>
				<div className="flex space-x-2 my-2">
					<button
						onClick={addNewColumn}
						className="p-1 border rounded bg-slate-500 border-customblack text-customwhite"
					>
						Add Column
					</button>
					<button
						onClick={handleAddTodo}
						className="p-1 border rounded bg-slate-500 border-customblack text-customwhite"
					>
						Add a Todo
					</button>
				</div>
				<div
					id="kanbanScrollArea"
					className="flex flex-row space-x-4 w-full min-h-fit py-2 bg-customlight overflow-x-auto"
				>
					{dataStore.map((column, index) => {
						return (
							<div
								key={index}
								className="w-[300px] min-w-[300px] rounded-lg md:w-1/3 h-fit bg-customlight border-2 flex flex-col"
							>
								<h1 className="text-center h-12 rounded bg-customlight w-full flex items-center justify-between px-4 text-customblack text-xl font-semibold">
									<span className="space-x-2 flex items-center">
										<span>{column.columnName}</span>
										<small className="w-[20px] border border-customblack rounded-full text-xs">
											{column.columnData.length}
										</small>
									</span>
									<div
										onClick={() => deleteColumn(index)}
										className="flex space-x-2"
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
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									</div>
								</h1>

								{column.columnData.length == 0 && (
									<div
										className="py-10 flex items-center justify-center"
										onDragEnter={e =>
											dragEnterHandle(e, index, 0)
										}
										onTouchEnd={e =>
											dragEnterHandle(e, index, 0)
										}
									>
										<span className="text-center font-semibold text-custom-gray">
											No Todos To Display
										</span>
									</div>
								)}

								{column.columnData.length > 0 &&
									column.columnData.map(
										(todoData, todoIndex) => {
											return (
												<KanbanTodo
													{...{
														dragStartHandle,
														dragEnterHandle,
														dragEndHandle,
														setCurrentIndex,
														setCurrentTodoId,
														forwardColumnClicked,
														backColumnClicked,
														viewTodoInfo,
														handleEditTodoClick,
														deleteTodoItem,
														todoData,
													}}
													key={todoIndex}
													todoIndex={todoIndex}
													columnIndex={index}
												></KanbanTodo>
											)
										}
									)}
							</div>
						)
					})}
				</div>
			</div>
		</>
	)
}

export default Kanban
