import React from "react"

const ModalTemplate = ({
	setModalVisible,
	addTodoToData,
	currentIndex,
	setTodoTitle,
	setTodoDescription,
	todoTitle,
	todoDescription,
	setLabelColor,
}) => {
	return (
		<div className="absolute top-14 mx-auto max-w-2xl w-screen h-auto border-2 rounded border-purple-800 z-10">
			<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
				<div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
					<h3 className="text-xl font-semibold text-gray-900 ">
						TODO
					</h3>
					<button
						type="button"
						className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600"
						data-modal-hide="defaultModal"
					>
						<svg
							aria-hidden="true"
							className="w-5 h-5"
							onClick={() => setModalVisible(false)}
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
								clipRule="evenodd"
							></path>
						</svg>
					</button>
				</div>
				<div className="p-6 space-y-6">
					<div className="flex- flex-col">
						<div className="relative mb-4">
							<label
								htmlFor="name"
								className="leading-7 text-sm text-gray-600"
							>
								Todo Title
							</label>
							<input
								value={todoTitle}
								onChange={e => setTodoTitle(e.target.value)}
								type="text"
								id="name"
								name="name"
								className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
								autoComplete="off"
							/>
						</div>
						<div className="relative mb-4">
							<label
								htmlFor="text"
								className="leading-7 text-sm text-gray-600"
							>
								Todo Description
							</label>
							<input
								value={todoDescription}
								onChange={e =>
									setTodoDescription(e.target.value)
								}
								type="text"
								id="text"
								name="text"
								className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
							/>
						</div>
						<div className="relative mb-4">
							<label
								htmlFor="text"
								className="leading-7 text-sm text-gray-600"
							>
								Current Time will be Updated
							</label>

							<div className="flex">
								<div className="flex items-center mr-4">
									<input
										defaultChecked
										onClick={() => setLabelColor("yellow")}
										id="inline-2-radio"
										type="radio"
										value=""
										name="inline-radio-group"
										className="w-4 h-4"
									/>
									<label
										htmlFor="inline-2-radio"
										className="ml-2 text-sm font-medium p-1 rounded bg-yellow-400 hover:bg-yellow-500"
									>
										Casual
									</label>
								</div>
								<div className="flex items-center mr-4">
									<input
										onClick={() => setLabelColor("green")}
										id="inline-2-radio"
										type="radio"
										value=""
										name="inline-radio-group"
										className="w-4 h-4"
									/>
									<label
										htmlFor="inline-2-radio"
										className="ml-2 text-sm font-medium p-1 rounded bg-green-400 hover:bg-green-500"
									>
										Working
									</label>
								</div>
								<div className="flex items-center mr-4">
									<input
										onClick={() => setLabelColor("red")}
										id="inline-2-radio"
										type="radio"
										value=""
										name="inline-radio-group"
										className="w-4 h-4"
									/>
									<label
										htmlFor="inline-2-radio"
										className="ml-2 text-sm font-medium p-1 rounded bg-red-400 hover:bg-red-500"
									>
										Urgent
									</label>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
					<button
						onClick={() => addTodoToData(currentIndex)}
						data-modal-hide="defaultModal"
						type="button"
						className=" bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
					>
						Add Todo
					</button>
					<button
						onClick={() => setModalVisible(false)}
						data-modal-hide="defaultModal"
						type="button"
						className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-purple-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-600"
					>
						Decline
					</button>
				</div>
			</div>
		</div>
	)
}

export default ModalTemplate
