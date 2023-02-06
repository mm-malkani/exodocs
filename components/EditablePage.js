import React, { useState } from "react"
import ContentEditable from "react-contenteditable"
import { uid } from "uid"

const newEditableDiv = {
	id: uid(),
	html: "New Div",
	tag: "p",
}
const initialData = { id: uid(), html: "Untitled", tag: "h1" }

const EditablePage = () => {
	const [mdxPageStore, setMdxPageStore] = useState([initialData])
	// useEffect(() => {
	// 	setMdxPageStore([initialData])
	// }, [])

	const handleOnChange = (e, pageDataId) => {
		if (!e.keyCode === 13 || !e.keyCode === 8) {
			console.log("OLD ", mdxPageStore)
			let tempMdxPageStore = [...mdxPageStore]
			let index = tempMdxPageStore.findIndex(
				data => data.id === pageDataId
			)
			tempMdxPageStore[index].html = e.target.value
			setMdxPageStore(tempMdxPageStore)
			console.log("NEW ", mdxPageStore)
		}
	}

	const handleOnKeyDown = (e, pageDataId) => {
		if (e.keyCode === 13) {
			let tempMdxPageStore = [...mdxPageStore]
			let index = tempMdxPageStore.findIndex(
				data => data.id === pageDataId
			)
			e.preventDefault()
			console.log("OLD ", mdxPageStore)
			// tempMdxPageStore.push(newEditableDiv)
			tempMdxPageStore.splice(index + 1, 0, newEditableDiv)
			console.log("SAVED ", tempMdxPageStore)
			setMdxPageStore(tempMdxPageStore)
			console.log("NEW ", mdxPageStore)
			return
		}
		if (e.key === "Backspace" || e.keyCode === 8) {
			let tempMdxPageStore = [...mdxPageStore]
			let index = tempMdxPageStore.findIndex(
				data => data.id === pageDataId
			)
			if (tempMdxPageStore[index].html.length <= 0) {
				tempMdxPageStore.splice(index, 1)
				setMdxPageStore(tempMdxPageStore)
				// console.debug("HOLA")
				return
			}
		}
	}

	return (
		<div>
			{mdxPageStore.map(pageData => {
				return (
					<ContentEditable
						autoFocus
						html={pageData.html}
						key={pageData.id}
						tagName={pageData.tag}
						id={pageData.id}
						onChange={e => {
							handleOnChange(e, pageData.id)
						}}
						className={`my-2 p-2 rounded-2xl`}
						onKeyDown={e => {
							handleOnKeyDown(e, pageData.id)
						}}
					></ContentEditable>
				)
			})}
		</div>
	)
}

export default EditablePage
