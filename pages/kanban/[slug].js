import { onAuthStateChanged } from "firebase/auth"
import { child, get, ref } from "firebase/database"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"
import { uid } from "uid"
import AddTodoModal from "../../components/AddTodoModal"
import FavouritesButton from "../../components/atoms/FavouritesButton"
import PublishButton from "../../components/atoms/PublishButton"
import EditTodoModal from "../../components/EditTodoModal"
import { sendDataToFirebase } from "../../components/functions/sendToDb"
import { useDebounced } from "../../components/functions/useDebounced"
import KanbanTodo from "../../components/kanbanTodo"
import LoginFirst from "../../components/LoginFirst"
import ColorPicker from "../../components/molecules/ColorPicker"
import OptionsButton from "../../components/molecules/OptionsButton"
import ViewModal from "../../components/ViewTodoBar"
import { auth, db } from "../../config/firebaseConfig"

const timestamp = Date().toString().slice(0, -30)

const dataBase = {
	mockData: {
		createdOn: timestamp,
		updatedOn: timestamp,
		creator: "",
		slug: "",
		favourite: false,
		type: "kanban",
		title: timestamp,
		kanban: [
			{
				columnId: uid(),
				color: "red",
				columnName: "Not Started",
				columnData: [
					{
						todoId: uid(),
						todoHeading: "Add Todo Title",
						todoDescription: "Todo Description will come here",
						todoCreationTime: timestamp,
						todoUpdateTime: "Haven't Updated Yet",
						label: "None",
					},
				],
			},
			{
				columnId: uid(),
				color: "yellow",
				columnName: "In-Progress",
				columnData: [],
			},
			{
				columnId: uid(),
				color: "green",
				columnName: "Completed",
				columnData: [],
			},
		],
	},
}

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
	//eslint-disable-next-line
	const [userObject, setUserObject] = useState("")
	const [login, setLogin] = useState(false)
	const [viewTodoBar, setViewTodoBar] = useState(false)
	const [editTodoBar, setEditTodoBar] = useState(false)
	const [titleCopy, setTitleCopy] = useState()
	const setDebouncedTitle = useDebounced(val => setTitleCopy(val), 1000)
	// eslint-disable-next-line
	useEffect(() => titleCopy && handleAutoSaveButton(), [titleCopy])

	useEffect(() => {
		onAuthStateChanged(auth, user => {
			if (user) {
				setUser(user)
				setUserObject(user)
				setLogin(true)
			} else {
				setLogin(false)
				setUserObject("")
			}
		})
	}, [])

	const dbRef = ref(db)
	useEffect(() => {
		setinitialData("")
		setDataStore([])
		setEditableTitle("")
		if (slug) {
			if (user.uid) {
				get(child(dbRef, `${user.uid}/kanban/${slug}`))
					.then(snapshot => {
						if (snapshot.exists()) {
							// console.debug(snapshot.val().storedData)
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
							const dataToAdd = dataBase["mockData"]
							setinitialData("")
							setDataStore([])
							setEditableTitle("")
							// console.debug("No data available")
							// console.debug(dataToAdd)
							dataToAdd.slug = slug
							dataToAdd.creator = user.email
							localStorage.setItem(
								slug,
								JSON.stringify(dataToAdd)
							)
							setinitialData(dataToAdd)
							setDataStore(dataToAdd.kanban)
							setEditableTitle(dataToAdd.title)
							sendDataToFirebase(user.uid, "kanban", slug)
						}
					})
					.catch(error => {
						console.debug(error)
					})
			}
			localStorage.removeItem("undefined")
		}
		// eslint-disable-next-line
	}, [router, user])

	const sendToLocalStorage = () => {
		const { slug } = router.query
		let tempDataStore = { ...initialData }
		tempDataStore.kanban = [...dataStore]
		setinitialData(tempDataStore)
		localStorage.setItem(slug, JSON.stringify(tempDataStore))
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
		// // console.debug(index)
		// setDataStore(dataStore.splice(index, 1))
		// // console.debug(dataStore)
		// const { slug } = router.query
		// setinitialData({ ...initialData, kanban: [...dataStore] })
		// // console.debug(dataStore)
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
		// console.debug(dataStore.length, columnIndex)
		if (dataStore.length === columnIndex + 1) {
			// alert("Can't Find Next Column")
			toast.error("Can't Find Next Column!", {
				position: "top-center",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
				theme: "dark",
			})
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
				console.debug(error)
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
	const addTodoToData = (todoTitle, todoDescription, label) => {
		const timestamp = Date().toString().slice(0, -30)
		let tempDataStore = dataStore
		const newTodoData = {
			todoId: uid(),
			todoHeading: todoTitle,
			todoDescription: todoDescription,
			todoCreationTime: timestamp,
			todoUpdateTime: "Haven't Updated Yet",
			label: label,
		}
		// console.debug(tempDataStore);
		try {
			tempDataStore[0].columnData.splice(0, 0, newTodoData)
			setDataStore(tempDataStore)
			sendToLocalStorage()
			handleAutoSaveButton()
			setModalVisible(false)
		} catch (error) {
			toast.error("No Column found to add!", {
				position: "top-center",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
				theme: "dark",
			})
			// console.debug(error)
			setModalVisible(false)
		}
	}

	const handleAddTodo = () => {
		let tempDataStore = dataStore
		if (tempDataStore[0]) {
			setModalVisible(true)
		} else {
			toast.error("No Column found to add!", {
				position: "top-center",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
				theme: "dark",
			})
		}
	}

	// -------------- VIEW TODO
	const [allTodoInfo, setAllTodoInfo] = useState("")
	const viewTodoInfo = (columnIndex, todoIndex) => {
		// console.debug(columnIndex, todoIndex)
		let tempDataStore = [...dataStore]
		setAllTodoInfo(tempDataStore[columnIndex].columnData[todoIndex])
		// console.debug(allTodoInfo)
		setViewTodoBar(true)
	}

	// -------------- UPDATE TODO
	const [todoCreationTime, setTodoCreationTime] = useState("")
	const [currentIndex, setCurrentIndex] = useState("")
	const [currentTodoId, setCurrentTodoId] = useState("")
	const [labelValue, setLabelValue] = useState("")

	const updateTodoToData = (
		todoTitleValue,
		todoDescriptionValue,
		labelValue
	) => {
		const timestamp = Date().toString().slice(0, -30)
		// console.debug(todoTitleValue, todoDescriptionValue, labelValue)
		// console.debug(dataStore)
		let tempDataStore = [...dataStore]
		let newTodoData = {
			todoId: uid(),
			todoHeading: todoTitleValue,
			todoDescription: todoDescriptionValue,
			todoCreationTime: todoCreationTime,
			todoUpdateTime: timestamp,
			label: labelValue,
		}
		tempDataStore[currentIndex].columnData.splice(
			currentTodoId,
			1,
			newTodoData
		)
		// console.debug(tempDataStore[currentIndex].columnData[currentTodoId])
		setDataStore(tempDataStore)
		sendToLocalStorage()
		publishData()
		setEditTodoBar(false)
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
		setLabelValue(dataStore[columnIndex].columnData[todoIndex].label)
		setCurrentIndex(columnIndex)
		setCurrentTodoId(todoIndex)
		setEditTodoBar(true)
	}

	// -------------- DELETE TODO
	const deleteTodoItem = (columnIndex, todoId) => {
		let tempDataStore = [...dataStore]
		tempDataStore[columnIndex].columnData = tempDataStore[
			columnIndex
		].columnData.filter(todo => todo.todoId != todoId)
		setDataStore(tempDataStore)
		sendToLocalStorage()
		handleAutoSaveButton()
	}

	// -----------------------------------------DRAG AND DROP FUNCTIONS
	let todoitemDrag = useRef()
	let todoitemDragOver = useRef()
	let dragOverColumnIndex = useRef()

	const dragStartHandle = (e, columnIndex, todoIndex) => {
		todoitemDrag.current = todoIndex
	}

	const dragEnterHandle = (e, columnIndex, todoIndex) => {
		todoitemDragOver.current = todoIndex
		dragOverColumnIndex.current = columnIndex
		// console.debug(columnIndex)
	}

	const dragEndHandle = (e, columnIndex) => {
		// console.debug(dragOverColumnIndex.current, "DRAG OVER INDEX COLUMN")
		let tempDataStore = [...dataStore]
		let todoItemMain =
			tempDataStore[columnIndex].columnData[todoitemDrag.current]
		try {
			if (columnIndex != dragOverColumnIndex.current) {
				tempDataStore[dragOverColumnIndex.current].columnData.splice(
					todoitemDragOver.current,
					0,
					todoItemMain
				)
				tempDataStore[columnIndex].columnData.splice(
					todoitemDrag.current,
					1
				)
				setDataStore(tempDataStore)
				sendToLocalStorage()
				handleAutoSaveButton()
			} else {
				if (todoitemDrag.current != todoitemDragOver.current) {
					tempDataStore[
						dragOverColumnIndex.current
					].columnData.splice(
						todoitemDragOver.current,
						0,
						todoItemMain
					)
					tempDataStore[columnIndex].columnData.splice(
						todoitemDrag.current,
						1
					)
					setDataStore(tempDataStore)
					sendToLocalStorage()
					handleAutoSaveButton()
				}
			}
			todoitemDrag.current = null
			todoitemDragOver.current = null
			dragOverColumnIndex.current = null
		} catch (err) {
			console.debug(err)
		}
	}

	// ----------------------FOR TITLE
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
		localStorage.setItem(slug, JSON.stringify(tempDataStore))
		// handleAutoSaveButton()
		// console.debug("SAVED")
	}

	const setFillColor = (color, index) => {
		const { slug } = router.query
		let tempDataStore = dataStore
		tempDataStore[index].color = color
		setDataStore(tempDataStore)
		setinitialData({ ...initialData, kanban: [...tempDataStore] })
		localStorage.setItem(slug, JSON.stringify(initialData))
		handleAutoSaveButton()
	}

	const toggleFavourites = () => {
		const { slug } = router.query
		let tempDataStore = { ...initialData }
		tempDataStore.favourite = !tempDataStore.favourite
		setinitialData(tempDataStore)
		localStorage.setItem(slug, JSON.stringify(tempDataStore))
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
							<AddTodoModal
								{...{
									setModalVisible,
									addTodoToData,
								}}
							/>
						)}
						{viewTodoBar && (
							<ViewModal
								setViewTodoBar={setViewTodoBar}
								allTodoInfo={allTodoInfo}
							/>
						)}
						{editTodoBar && (
							<EditTodoModal
								{...{
									setEditTodoBar,
									updateTodoToData,
									todoTitle,
									todoDescription,
									labelValue,
								}}
							/>
						)}
					</div>

					<div className="p-2 h-screen bg-customlight text-customblack dark:bg-customgray">
						<div className="flex space-x-2 justify-between">
							<input
								className="font-semibold p-1 text-sm rounded bg-customwhite w-2/3"
								onChange={e => {
									handleEditableTitle(e.target.value)
									setDebouncedTitle(e.target.value)
								}}
								// onKeyDown={handleKeyDown}
								// onKeyUp={e => handleKeyUp(e)}
								value={editableTitle}
							/>
							<div className="flex items-center space-x-1 justify-center">
								<PublishButton
									autoSave={autoSave}
									userId={user.uid}
									type="kanban"
									slug={slug}
								/>
								<FavouritesButton
									{...{ toggleFavourites }}
									favourite={initialData.favourite}
								/>
								<div>
									<button className="flex group items-center justify-between text-gray-700 font-medium outline-none hover:bg-customlight dark:hover:bg-customgray py-1 px-1 transition-all duration-200 rounded">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1}
											stroke="currentColor"
											className="w-6 h-6"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
											/>
										</svg>
										<span className="absolute bg-customwhite border-black border z-10 top-[100px] w-[320px] rounded right-0 p-1 invisible group-hover:visible">
											{`Updated On ${initialData.updatedOn}`}
											{`Created On ${initialData.createdOn}`}
										</span>
									</button>
								</div>
								<OptionsButton
									{...{
										autoSave,
										setAutoSave,
										slug,
									}}
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
							className="flex flex-row space-x-4 w-full min-h-fit py-2 bg-customlight overflow-x-auto dark:bg-customgray"
						>
							{dataStore.map((column, index) => {
								return (
									<div
										onMouseLeave={() =>
											setFillColorOptions(false)
										}
										key={index}
										className="w-[300px] min-w-[300px] rounded-lg md:w-1/3 h-fit bg-customlight border-2 dark:border-black flex flex-col"
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
																deleteTodoItem,
																todoData,
																viewTodoInfo,
																handleEditTodoClick,
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
			{!login && <LoginFirst />}
		</>
	)
}

export default Kanban
