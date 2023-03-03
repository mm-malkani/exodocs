import React from "react"
import { useState } from "react"
import ContentEditable from "react-contenteditable"

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
				<span
					title="Sort"
					className="cursor-move"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
						/>
					</svg>
				</span>
				<div className="flex flex-col sm:flex-row space-x-1">
					<span
						title="Add Element"
						className="cursor-pointer"
						onClick={() => {
							handleAddElement(index)
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className={`hidden group-hover:block cursor-pointer w-6 h-6`}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 4.5v15m7.5-7.5h-15"
							/>
						</svg>
					</span>

					<span
						onMouseEnter={() => setCaret(true)}
						title="Change Style"
						onClick={() => setCaret(!caret)}
						className="stylegroup cursor-pointer"
						onMouseLeave={() => setCaret(false)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className={`hidden group-hover:block cursor-pointer w-6 h-6`}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
							/>
						</svg>
						<ul
							className={`${
								caret
									? "bg-customlight border w-[150px] rounded h-[110px] absolute flex-col flex"
									: "hidden"
							}`}
						>
							<li
								onClick={() => {
									convertToH1(index)
								}}
								className="cursor-pointer rounded hover:bg-customwhite p-1.5 text-center font-bold"
							>
								Heading 1
							</li>
							<li
								onClick={() => {
									convertToH2(index)
								}}
								className="cursor-pointer rounded hover:bg-customwhite p-1.5 text-center font-semibold"
							>
								Heading 2
							</li>
							<li
								onClick={() => {
									convertToP(index)
								}}
								className="cursor-pointer rounded hover:bg-customwhite p-1.5
                            text-center"
							>
								Paragraph
							</li>
						</ul>
					</span>
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

			<span
				onClick={() => handleDeleteElement(index, length)}
				className={`flex`}
				title="Delete"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className={`hidden group-hover:block cursor-pointer w-6 h-6`}
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
					/>
				</svg>
				&nbsp;
			</span>
		</div>
	)
}

export default NewElement
