import { useRef, useState } from "react"
import { uid } from "uid"
import NewElement from "../../components/NewElement"

const initialData = {
	"571db831b7dacb7fcceea0872d7891db": {
		title: "Untitled hu bhai me",
		data: [
			{ id: uid(), tagName: "h1", html: "Ha me pagal hun" },
			{ id: uid(), tagName: "h2", html: "Ha me nahi hu h2 hu" },
			{ id: uid(), tagName: "p", html: "mujhe nahi pata me kon hu" },
		],
		creator: "abhiborana.a@gmail.com",
	},
}

const Post = () => {
	// const router = useRouter()
	// const { slug } = router.query

	const [dataStore, setDataStore] = useState(
		initialData["571db831b7dacb7fcceea0872d7891db"]
	)
	const [editableTitle, setEditableTitle] = useState(dataStore.title)

	const handleAddElement = index => {
		// console.log(abc)
		let tempDataStore = { ...dataStore }
		// console.log(tempDataStore);
		let newElement = { id: uid(), tagName: "p", html: "" }
		tempDataStore.data.splice(index + 1, 0, newElement)
		console.log(tempDataStore.data[index + 1])
		setDataStore(tempDataStore)
		setTimeout(() => {
			let abc = document.getElementById("parentNewElement")
			// console.log(Array.from(abc.children)[index + 1].querySelector("p"))
			try {
				Array.from(abc.children)[index + 1].querySelector("p").focus()
			} catch (error) {
				Array.from(abc.children)[0].querySelector("p").focus()
			}
		}, 100)
		// console.log(dataStore);
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
	}

	const handleOnChangeHtml = (index, html) => {
		let tempDataStore = { ...dataStore }
		tempDataStore.data[index].html = html
		setDataStore(tempDataStore)
	}

	const handleEditTitle = value => {
		setEditableTitle(value)
		let tempDataStore = { ...dataStore }
		tempDataStore.title = editableTitle
		setDataStore(tempDataStore)
	}

	const handleOnKeyDown = (e, index, length) => {
		if (e.keyCode === 13) {
			e.preventDefault()
			// console.log("ENTER PRESSES", index);
			handleAddElement(index)
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
			}
		} else {
			console.log(e.keyCode)
		}
	}

	// ChANGE THE STYLE OF TEXT
	const convertToH1 = index => {
		console.log(index)
		let tempDataStore = { ...dataStore }
		tempDataStore.data[index].tagName = "h1"
		setDataStore(tempDataStore)
	}
	const convertToH2 = index => {
		console.log(index)
		let tempDataStore = { ...dataStore }
		tempDataStore.data[index].tagName = "h2"
		setDataStore(tempDataStore)
	}
	const convertToP = index => {
		console.log(index)
		let tempDataStore = { ...dataStore }
		tempDataStore.data[index].tagName = "p"
		setDataStore(tempDataStore)
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
		let tempDataStore = { ...dataStore }
		let elementCopy = tempDataStore.data[elementDrag.current]
		tempDataStore.data.splice(elementDrag.current, 1)
		try {
			tempDataStore.data.splice(elementDragOver.current, 0, elementCopy)
			elementDrag = null
			elementDragOver = null
			setDataStore(tempDataStore)
		} catch (error) {
			console.log(error)
		}
		// console.log(elementCopy)
	}

	return (
		<div className="w-full flex flex-col p-2 space-y-2 min-h-screen overflow-x-hidden">
			<div className="flex space-x-2 justify-between w-full overflow-x-auto">
				<input
					className="font-semibold w-3/4 p-1 text-2xl md:text-3xl lg:text-4xl rounded bg-customwhite"
					onChange={e => handleEditTitle(e.target.value)}
					value={editableTitle}
				/>
				<button className="border-customblack border rounded px-1 md:px-2 bg-lime-600 hover:bg-green text-customwhite transition-all duration-150">
					Publish
				</button>
			</div>

			<div
				id="parentNewElement"
				className="flex flex-col items-center justify-center w-full space-y-2 bg-white overflow-y-auto overflow-x-hidden"
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
								convertToH1,
								convertToH2,
								convertToP,
								handleDragEnd,
								handleDragStart,
								handleDragEnter,
							}}
						/>
					)
				})}
			</div>
		</div>
	)
}

export default Post
