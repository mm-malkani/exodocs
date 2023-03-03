import React from "react"
import EditablePage from "../components/trials/EditablePage"

const FakeIndex = () => {
	return (
		<div>
			<h1 className="Logo">notion.clone</h1>
			<p className="Intro">
				Helloo{" "}
				<span
					role="img"
					aria-label="greetings"
					className="Emoji"
				>
					👋
				</span>{" "}
				You can add content below. Type <span className="Code">/</span>{" "}
				to see available elements.
			</p>
			<EditablePage />
		</div>
	)
}

export default FakeIndex
