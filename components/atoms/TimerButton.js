import React from "react"

const TimerButton = ({ createdTime = "NA", updatedTime = "NA" }) => {
	return (
		<div>
			<button className="flex group items-center justify-between text-gray-700 font-medium outline-none hover:bg-customlight py-1 px-1 transition-all duration-200 rounded">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1}
					stroke="currentColor"
					className="w-6 h-6"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<span className="absolute bg-customwhite border-black border z-10 top-[100px] w-[320px] rounded right-0 p-1 invisible group-hover:visible">
					{`Updated On ${updatedTime}`}
					{`Created On ${createdTime}`}
				</span>
			</button>
		</div>
	)
}

export default TimerButton
