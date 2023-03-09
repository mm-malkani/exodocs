import React, { useState } from "react"
import ContentEditable from "react-contenteditable"
import AddElement from "./atoms/AddElement"
import ChangeStyle from "./atoms/ChangeStyle"
import DeleteElement from "./atoms/DeleteElement"
import SortElement from "./atoms/SortElement"

const NewElement = ({
	handleAddElement,
	data,
	handleOnChangeHtml,
	handleOnKeyDown,
	index,
	handleDeleteElement,
	length,
	convertToH1,
	convertToH2,
	convertToP,
	handleDragEnd,
	handleDragStart,
	handleDragEnter,
}) => {
	const [caret, setCaret] = useState(false)

	return (
		<div
			draggable
			onDragStart={() => handleDragStart(index)}
			onDragEnter={() => handleDragEnter(index)}
			onDragOver={e => e.preventDefault()}
			onDragEnd={() => handleDragEnd()}
			className="group flex bg-white hover:bg-customlight hover:text-custom-gray p-1.5 items-center justify-between rounded w-full"
		>
			<div className="flex space-x-1 items-center">
				<SortElement />
				<div className="flex flex-col sm:flex-row space-x-1">
					<AddElement {...{ index, handleAddElement }} />

					<ChangeStyle
						{...{
							caret,
							setCaret,
							index,
							convertToH1,
							convertToH2,
							convertToP,
						}}
					/>
				</div>
			</div>

			<ContentEditable
				id={index}
				tagName={data.tagName}
				html={data.html}
				onChange={e => handleOnChangeHtml(index, e.target.value)}
				onKeyDown={e => handleOnKeyDown(e, index, length)}
				className="w-1/2 sm:w-3/5 md:w-3/4 xl:w-5/6 p-2 outline-custom-gray"
			/>

			{/* <EditableContent
                {...{ handleOnChangeHtml, handleOnKeyDown, index, data }}
            /> */}

			{/* <div className='w-auto max-w-screen-md' contentEditable>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio, blanditiis.</div> */}

			<DeleteElement {...{ index, length, handleDeleteElement }} />
		</div>
	)
}

export default NewElement
