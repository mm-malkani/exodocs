import React from "react"
import { sendDataToFirebase } from "../../functions/sendToDb"

const PublishButton = ({ autoSave, userId, type, slug }) => {
	return (
		<>
			{!autoSave && (
				<button
					// disabled={autoSave ? true : false}
					onClick={() => sendDataToFirebase(userId, type, slug)}
					className="border-customblack border rounded px-2 py-1.5 bg-green-600 hover:bg-green text-customwhite transition-all disabled:opacity-30 disabled:cursor-not-allowed duration-200 justify-center cursor-pointer"
				>
					Publish
				</button>
			)}
		</>
	)
}

export default PublishButton
