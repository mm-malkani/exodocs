import { uid } from "uid"
const timestamp = Date().toString().slice(0, -30)

export const initialData = {
	tempPage: {
		created: timestamp,
		slug: "",
		favourite: true,
		type: "pages",
		title: "Untitled",
		data: [
			{
				id: uid(),
				tagName: "h1",
				html: "Select Heading 1,2 or paragrapgh",
			},
		],
		creator: "abhiborana.a@gmail.com",
	},
}
