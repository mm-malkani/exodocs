const ViewModal = ({ setViewTodoBar, allTodoInfo }) => {
	return (
		<div>
			{/* Overlay */}

			<div className="fixed z-10 inset-0 overflow-y-auto text-slate-800">
				<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block ">
					{/* Background */}
					<div
						className="fixed inset-0 transition-opacity"
						aria-hidden="true"
					>
						<div className="absolute inset-0 bg-gray-500 opacity-75"></div>
					</div>

					{/* Modal */}
					<div className="inline-block align-top rounded-lg bg-customlight text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full dark:bg-slate-600 dark:text-customwhite alignBase">
						<div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
							{/* Title */}
							<div className="mb-2">
								<div
									id="title"
									className="shadow appearance-none font-semibold rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
								>
									{allTodoInfo.todoHeading}
								</div>
							</div>

							{/* Description */}
							<div className="mb-4">
								<div
									id="description"
									className="shadow appearance-none rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
								>
									{allTodoInfo.todoDescription}
								</div>
							</div>
							<div className="flex flex-col sm:flex-row justify-between">
								<div
									htmlFor="label"
									className="block appearance-none h-fit w-fit bg-gray-200 text-gray-700 py-1.5 p-3 rounded-full leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
								>
									{allTodoInfo.label}
								</div>
								<div className="time flex flex-col">
									<span>{`Updated - ${allTodoInfo.todoUpdateTime}`}</span>
									<span>{`Created - ${allTodoInfo.todoCreationTime} `}</span>
								</div>
							</div>
						</div>

						<div
							className={`px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse`}
						>
							{/* Cancel button */}
							<button
								onClick={() => setViewTodoBar(false)}
								type="button"
								className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white transition-all duration-300 text-base font-medium text-gray-700 hover:bg-slate-700 hover:text-customlight sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
							>
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
export default ViewModal
