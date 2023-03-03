import React, { useState, useEffect } from "react"
import { matchSorter } from "match-sorter"

const MENU_HEIGHT = 150
const allowedTags = [
	{
		id: "page-title",
		tag: "h1",
		label: "Page Title",
	},
	{
		id: "heading",
		tag: "h2",
		label: "Heading",
	},
	{
		id: "subheading",
		tag: "h3",
		label: "Subheading",
	},
	{
		id: "paragraph",
		tag: "p",
		label: "Paragraph",
	},
]

const SelectMenu = props => {
	const [command, setCommand] = useState("")
	const [items, setItems] = useState(allowedTags)
	const [selectedItem, setSelectedItem] = useState(0)

	const keyDownHandler = e => {
		const selected = selectedItem
		const keyPressed = e.key
		switch (keyPressed) {
			case "Enter":
				e.preventDefault()
				props.onSelect(items[selected].tag)
				break
			case "Backspace":
				if (!command) props.close()
				setCommand(prevCommand =>
					prevCommand.substring(0, prevCommand.length - 1)
				)
				break
			case "ArrowUp":
				e.preventDefault()
				const prevSelected =
					selected === 0 ? items.length - 1 : selected - 1
				setSelectedItem(prevSelected)
				break
			case "ArrowDown":
			case "Tab":
				e.preventDefault()
				const nextSelected =
					selected === items.length - 1 ? 0 : selected + 1
				setSelectedItem(nextSelected)
				break
			default:
				setCommand(prevCommand => prevCommand + keyPressed)
				break
		}
	}

	useEffect(() => {
		const filteredItems = matchSorter(allowedTags, command, {
			keys: ["tag"],
		})
		setItems(filteredItems)
	}, [command])

	useEffect(() => {
		document.addEventListener("keydown", keyDownHandler)
		return () => {
			document.removeEventListener("keydown", keyDownHandler)
		}
	})

	const { position } = props
	const x = position.x
	const y = position.y - MENU_HEIGHT
	const positionAttributes = { top: y, left: x }

	return (
		<div
			className="SelectMenu"
			style={positionAttributes}
		>
			<div className="Items">
				{items.map((item, key) => {
					const isSelected = items.indexOf(item) === selectedItem
					return (
						<div
							className={isSelected ? "Selected" : null}
							key={key}
							role="button"
							tabIndex="0"
							onClick={() => props.onSelect(item.tag)}
						>
							{item.label}
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default SelectMenu
