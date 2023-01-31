import React, { useState } from "react"
import EditableBlock from "./EditableBlock"
import uid from "./uid"

const EditablePage = () => {
	const initialBlock = { id: uid(), html: "", tag: "p" }
	const [state, setState] = useState({ blocks: [initialBlock] })

	const updatePageHandler = updatedBlock => {
		const blocks = state.blocks
		const index = blocks.map(b => b.id).indexOf(updatedBlock.id)
		const updatedBlocks = [...blocks]
		updatedBlocks[index] = {
			...updatedBlocks[index],
			tag: updatedBlock.tag,
			html: updatedBlock.html,
		}
		setState({ blocks: updatedBlocks })
	}
	const addBlockHandler = currentBlock => {
		const newBlock = { id: uid(), html: "", tag: "p" }
		const blocks = state.blocks
		const index = blocks.map(b => b.id).indexOf(currentBlock.id)
		const updatedBlocks = [...blocks]
		updatedBlocks.splice(index + 1, 0, newBlock)
		setState({ blocks: updatedBlocks })
	}
	const deleteBlockHandler = currentBlock => {
		// Only delete the block, if there is a preceding one
		const previousBlock = currentBlock.ref.previousElementSibling
		if (previousBlock) {
			const blocks = state.blocks
			const index = blocks.map(b => b.id).indexOf(currentBlock.id)
			const updatedBlocks = [...blocks]
			updatedBlocks.splice(index, 1)
			setState({ blocks: updatedBlocks })
			previousBlock.focus()
		}
	}

	return (
		<div className="space-y-2">
			{state.blocks.map((block, key) => {
				return (
					<EditableBlock
						key={key}
						id={block.id}
						tag={block.tag}
						html={block.html}
						className={`bg-slate-300`}
						updatePage={updatePageHandler}
						addBlock={addBlockHandler}
						deleteBlock={deleteBlockHandler}
					></EditableBlock>
				)
			})}
		</div>
	)
}

export default EditablePage
