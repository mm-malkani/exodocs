import { onAuthStateChanged } from "firebase/auth"
import { child, get, ref } from "firebase/database"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { uid } from "uid"
import PublishButton from "../../components/atoms/PublishButton"
import ColorPicker from "../../components/ColorPicker"
import { sendDataToFirebase } from "../../components/functions/sendToDb"
import KanbanTodo from "../../components/kanbanTodo"
import ModalTemplate from "../../components/ModalTemplate"
import OptionsButton from "../../components/molecules/OptionsButton"
import { auth, db } from "../../config/firebaseConfig"
import { dataBase } from "../../data/kanbanMockData"

const Kanban = () => {
	const router = useRouter()
	const { slug } = router.query

	const [initialData, setinitialData] = useState("")
	const [dataStore, setDataStore] = useState([])
	// const [currentIndex, setCurrentIndex] = useState("")
	const [modalVisible, setModalVisible] = useState(false)
	// const [currentTodoId, setCurrentTodoId] = useState("")
	const [editableTitle, setEditableTitle] = useState("")
	const [todoTitle, setTodoTitle] = useState("")
	const [todoDescription, setTodoDescription] = useState("")
	const [fillColorOptions, setFillColorOptions] = useState(false)
	const [user, setUser] = useState("")
	const [autoSave, setAutoSave] = useState(true)
	const [userObject, setUserObject] = useState("")
	const [login, setLogin] = useState(false)

	useEffect(() => {
		onAuthStateChanged(auth, user => {
			if (user) {
				setUser(user)
				setUserObject(user)
				setLogin(true)
			} else {
				setLogin(false)
			}
		})
	}, [])

	const dbRef = ref(db)
	useEffect(() => {
		if (slug) {
			if (user.uid) {
				get(child(dbRef, `${user.uid}/kanban/${slug}`))
					.then(snapshot => {
						if (snapshot.exists()) {
							// console.log(snapshot.val().storedData)
							localStorage.setItem(
								slug,
								JSON.stringify(
									JSON.parse(snapshot.val().storedData)
								)
							)
							let data = JSON.parse(localStorage.getItem(slug))
							setinitialData(data)
							setDataStore(data.kanban)
							setEditableTitle(data.title)
						} else {
							// console.log("No data available")
							let dataToAdd = { ...dataBase["mockData"] }
							// console.log(dataToAdd)
							dataToAdd.slug = slug
							localStorage.setItem(
								slug,
								JSON.stringify(dataToAdd)
							)
							let data = dataToAdd
							setinitialData(data)
							setDataStore(data.kanban)
							setEditableTitle(data.title)
							sendDataToFirebase(user.uid, "kanban", slug)
						}
					})
					.catch(error => {
						console.log(error)
					})
			}
			localStorage.removeItem("undefined")
			// eslint-disable-next-line
		}
	}, [router, user])

	const sendToLocalStorage = () => {
		const { slug } = router.query
		setinitialData({ ...initialData, kanban: [...dataStore] })
		localStorage.setItem(slug, JSON.stringify(initialData))
	}

	const publishData = () => {
		const { slug } = router.query
		sendDataToFirebase(user.uid, "kanban", slug)
	}

	const handleAutoSaveButton = () => {
		if (autoSave) {
			publishData()
		} else return
	}

	// ---------------------- FUNCTIONING OF COLUMN RELATED ADD/DELETE COLUMN FORWARD/BACK COLUMN

	// ------------ ADD COLUMN
	const addNewColumn = () => {
		const name = prompt("Enter Column Name")
		if (name) {
			const newColumn = {
				columnId: uid(),
				columnName: name,
				columnData: [],
				color: "gray",
			}
			// setDataStore([...dataStore, newColumn])
			// const { slug } = router.query
			// setinitialData({ ...initialData, kanban: [...dataStore] })
			// localStorage.setItem(slug, JSON.stringify(initialData))

			// WORKING
			const { slug } = router.query
			let tempDataStore = { ...initialData }
			tempDataStore.kanban.push(newColumn)
			setDataStore(tempDataStore.kanban)
			setinitialData(tempDataStore)
			localStorage.setItem(slug, JSON.stringify(tempDataStore))
			handleAutoSaveButton()
		}
	}

	// ------------ DELETE COLUMN
	const deleteColumn = index => {
		// // console.log(index)
		// setDataStore(dataStore.splice(index, 1))
		// // console.log(dataStore)
		// const { slug } = router.query
		// setinitialData({ ...initialData, kanban: [...dataStore] })
		// // console.log(dataStore)
		// localStorage.setItem(slug, JSON.stringify(initialData))
		///WORKING
		const { slug } = router.query
		let tempDataStore = { ...initialData }
		tempDataStore.kanban.splice(index, 1)
		setinitialData(tempDataStore)
		setDataStore(tempDataStore.kanban)
		localStorage.setItem(slug, JSON.stringify(tempDataStore))
		handleAutoSaveButton()
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
				handleAutoSaveButton()
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
		handleAutoSaveButton()
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
		}
		// console.log(tempDataStore);
		tempDataStore[0].columnData.splice(0, 0, newTodoData)
		setDataStore(tempDataStore)
		handleAutoSaveButton()
		sendToLocalStorage()
		setModalVisible(false)
		setTodoTitle("")
		setTodoDescription("")
	}

	const handleAddTodo = () => {
		setModalVisible(true)
	}

	// -------------- VIEW TODO
	// const viewTodoInfo = (columnIndex, todoIndex) => {
	//
	// }

	// -------------- UPDATE TODO
	// const updateTodoToData = (todoTitleValue, todoDescriptionValue) => {
	// 	const timestamp = Date().toString().slice(0, -30)
	//
	// }

	const handleEditTodoClick = (columnIndex, todoIndex) => {}

	// -------------- DELETE TODO
	const deleteTodoItem = (columnIndex, todoId) => {
		let tempDataStore = [...dataStore]
		tempDataStore[columnIndex].columnData = tempDataStore[
			columnIndex
		].columnData.filter(todo => todo.todoId != todoId)
		setDataStore(tempDataStore)
		handleAutoSaveButton()
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
		try {
			tempDataStore[dragOverColumnIndex].columnData.splice(
				todoitemDragOver.current,
				0,
				todoItemMain
			)
			tempDataStore[columnIndex].columnData.splice(
				todoitemDrag.current,
				1
			)
			todoitemDrag.current = null
			todoitemDragOver.current = null
			dragOverColumnIndex = null
			setDataStore(tempDataStore)
			handleAutoSaveButton()
			sendToLocalStorage()
		} catch (err) {
			console.log(err)
		}
	}

	// ----------------------FOR MOBILE

	const handleEditableTitle = eValue => {
		const { slug } = router.query
		// setEditableTitle(e.target.value)
		// setinitialData({ ...initialData, title: e.target.value })
		// localStorage.setItem(slug, JSON.stringify(initialData))
		/// WORKING
		setEditableTitle(eValue)
		let tempDataStore = { ...initialData }
		tempDataStore.title = eValue
		setinitialData(tempDataStore)
		handleAutoSaveButton()
		localStorage.setItem(slug, JSON.stringify(tempDataStore))
	}

	const setFillColor = (color, index) => {
		let tempDataStore = [...dataStore]
		tempDataStore[index].color = color
		setDataStore(tempDataStore)
		const { slug } = router.query
		setinitialData({ ...initialData, kanban: [...dataStore] })
		handleAutoSaveButton()
		localStorage.setItem(slug, JSON.stringify(tempDataStore))
	}

	const toggleFavourites = () => {
		const { slug } = router.query
		let tempDataStore = { ...initialData }
		tempDataStore.favourite = !tempDataStore.favourite
		setinitialData(tempDataStore)
		localStorage.setItem(slug, JSON.stringify(tempDataStore))
		handleAutoSaveButton()
		sendDataToFirebase(user.uid, "kanban", slug)
	}

	return (
		<>
			{login && (
				<>
					<Head>
						<title>{`ExoDocs - ${editableTitle}`}</title>
					</Head>
					<div className="w-screen flex justify-center">
						{modalVisible && (
							<ModalTemplate
								{...{
									setModalVisible,
									addTodoToData,
									setTodoTitle,
									setTodoDescription,
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
								onChange={e =>
									handleEditableTitle(e.target.value)
								}
								value={editableTitle}
							/>
							<div className="flex items-center space-x-1 justify-center">
								<PublishButton
									autoSave={autoSave}
									userId={user.uid}
									type="kanban"
									slug={slug}
								/>
								<OptionsButton
									{...{
										toggleFavourites,
										autoSave,
										setAutoSave,
										slug,
									}}
									favourite={initialData.favourite}
									userUid={user.uid}
									type={"k"}
								/>
							</div>
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
										onMouseLeave={() =>
											setFillColorOptions(false)
										}
										key={index}
										className="w-[300px] min-w-[300px] rounded-lg md:w-1/3 h-fit bg-customlight border-2 flex flex-col"
									>
										<h1 className="text-center h-12 rounded bg-customlight w-full flex items-center justify-between px-4 text-customblack text-xl font-semibold">
											<span
												title="Change Color"
												className="space-x-2 flex items-center"
											>
												<span className="relative">
													<svg
														onClick={() =>
															setFillColorOptions(
																!fillColorOptions
															)
														}
														xmlns="http://www.w3.org/2000/svg"
														fill={column.color}
														viewBox="0 0 24 24"
														strokeWidth={1.5}
														stroke="currentColor"
														className="w-6 h-6 cursor-pointer"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z"
														/>
													</svg>
													<ColorPicker
														{...{
															setFillColor,
															index,
															fillColorOptions,
															setFillColorOptions,
														}}
													/>
												</span>
												<span>{column.columnName}</span>
												<small className="w-[20px] border border-customblack rounded-full text-xs">
													{column.columnData.length}
												</small>
											</span>
											<div
												onClick={() =>
													deleteColumn(index)
												}
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
												onTouchEnd={e => {
													dragEndHandle(
														e.changedTouches[0],
														0
													)
												}}
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
																forwardColumnClicked,
																backColumnClicked,
																handleEditTodoClick,
																deleteTodoItem,
																todoData,
															}}
															key={todoIndex}
															todoIndex={
																todoIndex
															}
															columnIndex={index}
															fillColor={
																column.color
															}
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
			)}
			{!login && (
				<main className="flex-1 overflow-y-auto">
					{/* Navbar */}

					{/* Content section */}
					<div className="p-4">
						<h1 className="text-2xl text-center font-bold mb-4 flex space-x-2 justify-center">
							<span>You must Login First</span>
							<Link
								href={"/login"}
								className="inline-flex items-center border-0 px-3 focus:outline-none bg-slate-200 rounded text-base font-normal mt-0"
							>
								Login
								<svg
									fill="none"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									className="w-4 h-4 ml-1"
									viewBox="0 0 24 24"
								>
									<path d="M5 12h14M12 5l7 7-7 7"></path>
								</svg>
							</Link>
						</h1>
						{/* Content section content goes here */}
					</div>
				</main>
			)}
		</>
	)
}

export default Kanban
