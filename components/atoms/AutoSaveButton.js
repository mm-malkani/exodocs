import React from "react"

const AutoSaveButton = ({ autoSave, setAutoSave }) => {
	return (
		<div className="flex items-center justify-between space-x-2 border  py-1 px-2">
			<div className="text-gray-700 font-medium">Auto-save</div>
			<label
				htmlFor="autosave"
				className="flex items-center cursor-pointer"
			>
				<div className="relative">
					<input
						type="checkbox"
						id="autosave"
						checked={autoSave}
						onChange={() => setAutoSave(!autoSave)}
						className="sr-only"
					/>
					<div className="block bg-gray-600 w-10 h-6 rounded-full"></div>
					<div
						className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
							autoSave ? "translate-x-4 bg-green-500" : ""
						}`}
					></div>
				</div>
			</label>
		</div>
	)
}

export default AutoSaveButton
