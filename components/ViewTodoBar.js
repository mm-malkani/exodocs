import React from "react"

const ViewModal = ({ setViewModalVisible, allTodoInfo }) => {
	return (
		<div
			className={`absolute top-0 bg-customwhite right-0 mx-auto h-screen overflow-y-auto border-2 z-10 max-w-xs overflow-x-hidden`}
		>
			<div className="relative w-full">
				<div className="flex items-start justify-between p-2 border-b">
					<p className="text-xl font-semibold text-gray-900 max-w-[250px]">
						{allTodoInfo.todoHeading}
					</p>
					<button
						type="button"
						className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg"
						data-modal-hide="defaultModal"
					>
						<svg
							aria-hidden="true"
							className="w-5 h-5"
							onClick={() => setViewModalVisible(false)}
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
				<p className="p-3">{allTodoInfo.todoDescription}</p>
				<div className="text-center py-2 border-t-2 bg-slate-300 font-normal">
					<p>
						Last Updated :-{" "}
						<span className="font-semibold">
							{allTodoInfo.todoUpdateTime}
						</span>
					</p>
					<p>
						Created At :-{" "}
						<span className="font-semibold">
							{allTodoInfo.todoCreationTime}
						</span>
					</p>
				</div>
			</div>
		</div>
	)
}

export default ViewModal
