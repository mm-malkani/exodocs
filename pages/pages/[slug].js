import { onAuthStateChanged } from "firebase/auth"
import { child, get, ref } from "firebase/database"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { uid } from "uid"
import FavouritesButton from "../../components/atoms/FavouritesButton"
import PublishButton from "../../components/atoms/PublishButton"
import { sendDataToFirebase } from "../../components/functions/sendToDb"
import LoginFirst from "../../components/LoginFirst"
import OptionsButton from "../../components/molecules/OptionsButton"
import NewElement from "../../components/NewElement"
import { auth, db } from "../../config/firebaseConfig"
import { initialData } from "../../data/pageInitialDat"

const Post = () => {
	const router = useRouter()
	const { slug } = router.query
	const dbRef = ref(db)

	const [dataStore, setDataStore] = useState(initialData["tempPage"])
	const [autoSave, setAutoSave] = useState(true)
	const [editableTitle, setEditableTitle] = useState(dataStore.title)
	const [login, setLogin] = useState(false)

	const [user, setUser] = useState("")

	useEffect(() => {
		onAuthStateChanged(auth, user => {
			if (user) {
				setUser(user)
				setLogin(true)
			} else {
				setLogin(false)
			}
		})
	}, [])

	useEffect(() => {
		const { slug } = router.query
		if (slug) {
			if (user.uid) {
				get(child(dbRef, `${user.uid}/pages/${slug}`))
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
							setDataStore(data)
							setEditableTitle(data.title)
						} else {
							// console.log("No data available")
							let dataToAdd = { ...initialData["tempPage"] }
							dataToAdd.slug = `${slug}`
							dataToAdd.creator = `${user.email}`
							// console.log(dataToAdd.slug)
							localStorage.setItem(
								slug,
								JSON.stringify(dataToAdd)
							)
							let data = dataToAdd
							setDataStore(data)
							setEditableTitle(data.title)
							sendDataToFirebase(user.uid, "pages", slug)
						}
					})
					.catch(error => {
						console.error(error)
					})
			}
			localStorage.removeItem("undefined")
		}

		return () => {
			setDataStore(initialData["tempPage"])
			setEditableTitle(dataStore.title)
		}

		//eslint-disable-next-line
	}, [router, user])

	const sendToLocalStorage = tempDataStore => {
		const { slug } = router.query
		localStorage.setItem(slug, JSON.stringify(tempDataStore))
	}

	const publishData = () => {
		const { slug } = router.query
		sendDataToFirebase(user.uid, "pages", slug)
	}

	const handleAutoSaveButton = () => {
		if (autoSave) {
			publishData()
		} else return
	}

	const handleAddElement = index => {
		const { slug } = router.query
		let tempDataStore = JSON.parse(localStorage.getItem(slug))
		// console.log(dataStore)
		if (tempDataStore.slug) {
			let newElement = { id: uid(), tagName: "p", html: "" }
			tempDataStore.data.splice(index + 1, 0, newElement)
			setDataStore(tempDataStore)
			sendToLocalStorage(tempDataStore)
			handleAutoSaveButton()
			setTimeout(() => {
				let abc = document.getElementById("parentNewElement")
				// console.log(Array.from(abc.children)[index + 1].querySelector("p"))
				try {
					Array.from(abc.children)
						[index + 1].querySelector("p")
						.focus()
				} catch (error) {
					Array.from(abc.children)[0].querySelector("p").focus()
				}
			}, 100)
		}
	}

	function setCaret(el) {
		var range = document.createRange()
		var sel = window.getSelection()

		range.setStart(el, 1)
		range.collapse(true)

		sel.removeAllRanges()
		sel.addRange(range)
	}

	const handleDeleteElement = (index, length) => {
		// console.log(index);
		let tempDataStore = { ...dataStore }
		if (length <= 1) {
			let newElement = { id: uid(), tagName: "p", html: "" }
			tempDataStore.data.splice(index, 1, newElement)
			setDataStore(tempDataStore)
		} else {
			// console.log(tempDataStore.data);
			tempDataStore.data.splice(index, 1)
			setDataStore(tempDataStore)
		}
		setTimeout(() => {
			try {
				let abc = document.getElementById("parentNewElement")
				// console.log(index);
				let array = Array.from(abc.children)
				if (index == 0) {
					array[0].querySelector("div").nextSibling.focus()
				} else {
					let caretVar =
						array[index - 1].querySelector("div").nextSibling
					setCaret(caretVar)
				}
			} catch (error) {
				// console.log(error)
				handleAddElement(0)
			}
		}, 200)
		sendToLocalStorage(tempDataStore)
		handleAutoSaveButton()
	}

	const handleOnChangeHtml = (index, html) => {
		let tempDataStore = { ...dataStore }
		tempDataStore.data[index].html = html
		setDataStore(tempDataStore)
		sendToLocalStorage(tempDataStore)
		handleAutoSaveButton()
	}

	const handleEditTitle = value => {
		const { slug } = router.query
		let tempDataStore = { ...dataStore }
		tempDataStore.title = value
		setDataStore(tempDataStore)
		localStorage.setItem(slug, JSON.stringify(tempDataStore))
		setEditableTitle(value)
		handleAutoSaveButton()
	}

	const handleOnKeyDown = (e, index, length) => {
		if (e.keyCode === 13) {
			e.preventDefault()
			// console.log("ENTER PRESSES", index);
			handleAddElement(index)
			return
		} else if (e.keyCode === 8) {
			// handleDeleteElement(index)
			let tempDataStore = { ...dataStore }
			// console.log(tempDataStore.data[index].html.length)
			if (
				!tempDataStore.data[index].html.length ||
				tempDataStore.data[index].html.length <= 0
			) {
				e.preventDefault()
				handleDeleteElement(index, length)
				return
			}
		} else {
			// console.log(e.keyCode)
		}
	}

	// ChANGE THE STYLE OF TEXT
	const convertTagName = (index, type) => {
		// console.log(index)
		let tempDataStore = { ...dataStore }
		tempDataStore.data[index].tagName = type
		setDataStore(tempDataStore)
		sendToLocalStorage(tempDataStore)
		handleAutoSaveButton()
	}

	// DRAG AND DROP FUNCTIONALITY
	let elementDrag = useRef()
	let elementDragOver = useRef()

	const handleDragStart = index => {
		elementDrag.current = index
		// console.log(index)
	}

	const handleDragEnter = index => {
		elementDragOver.current = index
		// console.log(index)
	}

	const handleDragEnd = () => {
		// console.log(e)
		if (elementDrag.current != elementDragOver.current) {
			// console.log(elementDrag.current, elementDragOver.current)
			let tempDataStore = { ...dataStore }
			let elementCopy = tempDataStore.data[elementDrag.current]
			tempDataStore.data.splice(elementDrag.current, 1)
			try {
				tempDataStore.data.splice(
					elementDragOver.current,
					0,
					elementCopy
				)
				elementDrag = null
				elementDragOver = null
				setDataStore(tempDataStore)
				sendToLocalStorage(tempDataStore)
				handleAutoSaveButton()
			} catch (error) {
				console.log(error)
			}
			// console.log(elementCopy)
		}
	}

	const toggleFavourites = () => {
		const { slug } = router.query
		let tempDataStore = { ...dataStore }
		tempDataStore.slug = slug
		tempDataStore.favourite = !tempDataStore.favourite
		setDataStore(tempDataStore)
		localStorage.setItem(slug, JSON.stringify(tempDataStore))
		publishData()
	}

	return (
		<>
			{!login && <LoginFirst />}
			{login && (
				<div className="w-full flex flex-col p-2 space-y-2 h-full overflow-x-hidden">
					<Head>
						<title>{`ExoDocs - ${editableTitle}`}</title>
					</Head>
					<div className="flex space-x-2 justify-between screenNav text-customblack">
						<input
							className="font-semibold p-1 text-sm rounded w-1/2 bg-customwhite"
							onChange={e => handleEditTitle(e.target.value)}
							value={editableTitle}
						/>
						<div className="flex items-center space-x-1 justify-center">
							<PublishButton
								autoSave={autoSave}
								userId={user.uid}
								type="pages"
								slug={slug}
							/>
							<FavouritesButton
								{...{ toggleFavourites }}
								favourite={dataStore.favourite}
							/>
							<div>
								<button className="flex group items-center justify-between text-gray-700 font-medium outline-none hover:bg-customlight py-1 px-1 transition-all duration-200 rounded">
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
										{`Updated On ${dataStore.updatedOn}`}
										{`Created On ${dataStore.createdOn}`}
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
								type={"p"}
							/>
						</div>
					</div>

					<div
						id="parentNewElement"
						className="flex flex-col items-center screenNav justify-center w-full space-y-2 bg-white overflow-y-auto overflow-x-auto"
					>
						{dataStore.data.map((data, index, arr) => {
							// console.log(arr.length)
							return (
								<NewElement
									length={arr.length}
									key={data.id}
									{...{
										index,
										handleAddElement,
										handleDeleteElement,
										data,
										handleOnChangeHtml,
										handleOnKeyDown,
										convertTagName,
										handleDragEnd,
										handleDragStart,
										handleDragEnter,
									}}
								/>
							)
						})}
					</div>
				</div>
			)}
		</>
	)
}

export default Post
