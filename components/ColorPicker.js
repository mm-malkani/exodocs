import React from "react"

const ColorPicker = ({
	setFillColor,
	index,
	fillColorOptions,
	setFillColorOptions,
}) => {
	const colors = [
		{
			color: "red",
		},
		{
			color: "blue",
		},
		{
			color: "brown",
		},
		{
			color: "gray",
		},
		{
			color: "green",
		},
		{
			color: "yellow",
		},
		{
			color: "purple",
		},
		{
			color: "white",
		},
	]
	return (
		<div
			onMouseEnter={() => setFillColorOptions(true)}
			onMouseLeave={() => setFillColorOptions(false)}
			className={`${
				fillColorOptions ? "scale-100" : "scale-0"
			} bg-customwhite border border-gray rounded-md absolute inline-block z-50 transition-all duration-150`}
		>
			<h5>Select a Color</h5>
			<div className="flex flex-wrap w-[150px] items-center justify-center p-2">
				<div className="flex items-center justify-center">
					<label
						title="red"
						onClick={() => {
							setFillColor("red", index)
							setFillColorOptions(false)
						}}
						className={`cursor-pointer m-1 w-6 h-6 rounded-full border border-gray-400 bg-red`}
					></label>
				</div>
				<div className="flex items-center justify-center">
					<label
						title="red"
						onClick={() => {
							setFillColor("yellow", index)
							setFillColorOptions(false)
						}}
						className={`cursor-pointer m-1 w-6 h-6 rounded-full border border-gray-400 bg-yellow`}
					></label>
				</div>
				<div className="flex items-center justify-center">
					<label
						title="red"
						onClick={() => {
							setFillColor("green", index)
							setFillColorOptions(false)
						}}
						className={`cursor-pointer m-1 w-6 h-6 rounded-full border border-gray-400 bg-green`}
					></label>
				</div>
				<div className="flex items-center justify-center">
					<label
						title="red"
						onClick={() => {
							setFillColor("blue", index)
							setFillColorOptions(false)
						}}
						className={`cursor-pointer m-1 w-6 h-6 rounded-full border border-gray-400 bg-blue`}
					></label>
				</div>
				<div className="flex items-center justify-center">
					<label
						title="red"
						onClick={() => {
							setFillColor("gray", index)
							setFillColorOptions(false)
						}}
						className={`cursor-pointer m-1 w-6 h-6 rounded-full border border-gray-400 bg-gray`}
					></label>
				</div>
				<div className="flex items-center justify-center">
					<label
						title="red"
						onClick={() => {
							setFillColor("purple", index)
							setFillColorOptions(false)
						}}
						className={`cursor-pointer m-1 w-6 h-6 rounded-full border border-gray-400 bg-purple`}
					></label>
				</div>
				<div className="flex items-center justify-center">
					<label
						title="red"
						onClick={() => {
							setFillColor("brown", index)
							setFillColorOptions(false)
						}}
						className={`cursor-pointer m-1 w-6 h-6 rounded-full border border-gray-400 bg-brown`}
					></label>
				</div>
				<div className="flex items-center justify-center">
					<label
						title="red"
						onClick={() => {
							setFillColor("white", index)
							setFillColorOptions(false)
						}}
						className={`cursor-pointer m-1 w-6 h-6 rounded-full border border-gray-400 bg-white`}
					></label>
				</div>
			</div>
		</div>
	)
}

export default ColorPicker
