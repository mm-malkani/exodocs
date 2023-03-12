import { useState } from "react"

const AddTodoModal = ({ setModalVisible, addTodoToData }) => {
	const [todoTitle, setTodoTitle] = useState("")
	const [todoDescription, setTodoDescription] = useState("")
	const [labelValue, setLabelValue] = useState("None")

	return (
		<>
			{/* Overlay */}

			<div className="fixed z-10 inset-0 overflow-y-auto">
				<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
					{/* Background */}
					<div
						className="fixed inset-0 transition-opacity"
						aria-hidden="true"
					>
						<div className="absolute inset-0 bg-gray-500 opacity-75"></div>
					</div>

					{/* Modal */}
					<div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
						<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
							{/* Title */}
							<div className="mb-2">
								<label
									htmlFor="title"
									className="block text-gray-700 font-bold mb-2"
								>
									Title*
								</label>
								<input
									required
									type="text"
									id="title"
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									placeholder="Title (Required)"
									value={todoTitle}
									onChange={e => setTodoTitle(e.target.value)}
								/>
							</div>

							{/* Description */}
							<div className="mb-4">
								<label
									htmlFor="description"
									className="block text-gray-700 font-bold mb-2"
								>
									Description
								</label>
								<textarea
									id="description"
									rows={5}
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									placeholder="Description"
									value={todoDescription}
									onChange={e =>
										setTodoDescription(e.target.value)
									}
									required
								></textarea>
							</div>
							<div className="mb-4">
								<label className="block text-gray-700 font-bold mb-2">
									Choose a Label
								</label>
								<select
									value={labelValue}
									onChange={e =>
										setLabelValue(e.target.value)
									}
									htmlFor="label"
									className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-1.5 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
								>
									<option
										htmlFor="label"
										value="Default"
									>
										Default
									</option>
									<option
										htmlFor="label"
										value="Bug"
									>
										Bug
									</option>
									<option
										htmlFor="label"
										value="Todo"
									>
										Todo
									</option>
									<option
										htmlFor="label"
										value="None"
									>
										None
									</option>
								</select>
							</div>
						</div>

						<div
							className={`bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse`}
						>
							{/* Save button */}
							<button
								disabled={todoTitle.length <= 0}
								onClick={() => {
									if (todoTitle.length >= 1) {
										addTodoToData(
											todoTitle,
											todoDescription,
											labelValue
										)
									}
								}}
								type="submit"
								className="w-full inline-flex disabled:opacity-40 disabled:cursor-not-allowed justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-slate-600 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
							>
								Save
							</button>

							{/* Cancel button */}
							<button
								onClick={() => setModalVisible(false)}
								type="button"
								className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
export default AddTodoModal
