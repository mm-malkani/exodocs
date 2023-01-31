import React, { useState } from "react"
import { uid } from "uid"

const EditablePage = () => {
	const rawBlock = { id: uid(), html: "", tag: "p" }
	const [initialTitle, setinitialTitle] = useState("Untitled")
	const [initialBlock, setInitialBlock] = useState()

	return <div></div>
}

export default EditablePage
