import React, { useEffect, useRef, useState } from "react"
import ContentEditable from "react-contenteditable"

const EditableBlock = props => {
	const CMD_KEY = "/"
	const [htmlBackup, setHtmlBackup] = useState(null)
	const [html, setHtml] = useState(props.html)
	const [tag, setTag] = useState(props.tag)
	const [previousKey, setPreviousKey] = useState("")
	const contentEditable = useRef(null)

	useEffect(() => {
		setHtml(props.html)
		setTag(props.tag)
	}, [])

	useEffect(() => {
		if (html !== props.html || tag !== props.tag) {
			props.updatePage({
				id: props.id,
				html: html,
				tag: tag,
			})
		}
	}, [html, tag, props])

	const onChangeHandler = e => {
		console.log(e.target.value)
		setHtml(e.target.value)
	}

	const onKeyDownHandler = e => {
		if (e.key === CMD_KEY) {
			setHtmlBackup(html)
		}
		if (e.key === "Enter") {
			if (previousKey !== "Shift") {
				e.preventDefault()
				props.addBlock({
					id: props.id,
					ref: contentEditable.current,
				})
			}
		}
		if (e.key === "Backspace" && !html) {
			e.preventDefault()
			props.deleteBlock({
				id: props.id,
				ref: contentEditable.current,
			})
		}
		setPreviousKey(e.key)
	}

	return (
		<div>
			<ContentEditable
				onChange={onChangeHandler}
				innerRef={contentEditable}
				html={props.html}
				tagName={props.tagName}
				onKeyDown={onKeyDownHandler}
				className={`bg-zinc-200`}
			/>
		</div>
	)
}

export default EditableBlock
