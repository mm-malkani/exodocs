import React, { useEffect, useState } from "react"
import AutoSaveButton from "../atoms/AutoSaveButton"
import FavouritesButton from "../atoms/FavouritesButton"
import ShareButton from "../atoms/ShareButton"

const OptionsButton = ({
	favourite,
	toggleFavourites,
	autoSave,
	setAutoSave,
	userUid,
	type,
	slug,
}) => {
	const [optionsMenu, setOptionsMenu] = useState(false)

	return (
		<div className="flex relative">
			<div onClick={() => setOptionsMenu(!optionsMenu)}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-7 h-7 cursor-pointer"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
			</div>

			<div
				onMouseLeave={() => setOptionsMenu(false)}
				className={`${
					optionsMenu ? "scale-100" : "scale-0"
				} absolute right-full flex flex-col bg-customwhite w-[160px] border-gray border rounded space-y-1 transition-all duration-200`}
			>
				<AutoSaveButton {...{ autoSave, setAutoSave }} />
				<ShareButton {...{ userUid, type, slug }} />
				<FavouritesButton {...{ favourite, toggleFavourites }} />
			</div>
		</div>
	)
}

export default OptionsButton
