import React, { useEffect, useState } from "react"
import ContentEditable from "react-contenteditable"
import AddElement from "./atoms/AddElement"
import ChangeStyle from "./atoms/ChangeStyle"
import DeleteElement from "./atoms/DeleteElement"
import SortElement from "./atoms/SortElement"
import { useDebounced } from "./functions/useDebounced"

const NewElement = ({
	handleAddElement,
	data,
	handleOnChangeHtml,
	handleOnKeyDown,
	index,
	handleDeleteElement,
	length,
	convertTagName,
	handleDragEnd,
	handleDragStart,
	handleDragEnter,
	handleAutoSaveButton,
}) => {
	const [caret, setCaret] = useState(false)
	const [htmlValue, setHtmlValue] = useState("")
	const setHtml = useDebounced(val => setHtmlValue(val), 3000)

	useEffect(() => {
		if (htmlValue) {
			handleAutoSaveButton()
		}
		// eslint-disable-next-line
	}, [htmlValue])

	return (
		<div className="group flex bg-white dark:bg-customgray dark:hover:bg-hovergray hover:bg-customlight hover:text-custom-gray p-1.5 items-center rounded w-full">
			<div className="flex space-x-1 items-center">
				<SortElement
					{...{
						handleDragEnter,
						handleDragStart,
						handleDragEnd,
						index,
					}}
				/>
				<div className="flex flex-col sm:flex-row space-x-1">
					<AddElement {...{ index, handleAddElement }} />

					<ChangeStyle
						{...{
							caret,
							setCaret,
							index,
							convertTagName,
						}}
					/>
				</div>
			</div>

			<ContentEditable
				id={index}
				tagName={data.tagName}
				html={data.html}
				onChange={e => {
					handleOnChangeHtml(index, e.target.value)
					setHtml(e.target.value)
				}}
				onKeyDown={e => handleOnKeyDown(e, index, length)}
				className="min-w-[60vw] max-w-[60vw] md:max-w-[75vw] md:min-w-[75vw] lg:min-w-[85vw] lg:max-w-[85vw] mx-auto p-2 outline-custom-gray"
			/>

			<DeleteElement {...{ index, length, handleDeleteElement }} />
		</div>
	)
}

export default NewElement
