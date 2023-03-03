import React from "react"

const EditableContent = ({
	handleOnChangeHtml,
	handleOnKeyDown,
	index,
	data,
}) => {
	return (
		<div
			className="w-1/2 sm:w-3/5 md:w-3/4 xl:w-5/6"
			id={index}
		>
			{data.tagName === "h1" && (
				<div
					contentEditable
					className="cursor-text max-w-full text-2xl sm:text-4xl xl:text-5xl focus:outline-custom-gray"
					onChange={e =>
						handleOnChangeHtml(index, e.target.innerText)
					}
					onKeyDown={e => handleOnKeyDown(e, index)}
				>
					{data.html}
				</div>
			)}
			{data.tagName === "h2" && (
				<div
					contentEditable
					className="cursor-text max-w-full text-xl sm:text-2xl xl:text-4xl focus:outline-custom-gray"
					onChange={e =>
						handleOnChangeHtml(index, e.target.innerText)
					}
					onKeyDown={e => handleOnKeyDown(e, index)}
				>
					{data.html}
				</div>
			)}
			{data.tagName === "p" && (
				<div
					contentEditable
					className="cursor-text max-w-full text-base xl:text-xl focus:outline-custom-gray"
					onChange={e =>
						handleOnChangeHtml(index, e.target.innerText)
					}
					onKeyDown={e => handleOnKeyDown(e, index)}
				>
					{data.html}
				</div>
			)}
		</div>
	)
}

export default EditableContent
