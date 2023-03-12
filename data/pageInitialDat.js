import { uid } from "uid"
const timestamp = Date().toString().slice(0, -30)

export const initialData = {
	tempPage: {
		createdOn: timestamp,
		updatedOn: timestamp,
		creator: "",
		slug: "",
		favourite: false,
		type: "pages",
		title: timestamp,
		data: [
			{
				id: uid(),
				tagName: "h1",
				html: "Select Heading 1,2 or paragrapgh",
			},
		],
	},
}
