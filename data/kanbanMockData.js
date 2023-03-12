import { uid } from "uid"
const timestamp = Date().toString().slice(0, -30)

export const dataBase = {
	mockData: {
		createdOn: timestamp,
		updatedOn: timestamp,
		creator: "abhiborana.a@gmail.com",
		slug: "",
		favourite: false,
		type: "kanban",
		title: timestamp,
		kanban: [
			{
				columnId: uid(),
				color: "red",
				columnName: "Not Started",
				columnData: [
					{
						todoId: uid(),
						todoHeading: "Add Todo Title",
						todoDescription: "Todo Description will come here",
						todoCreationTime: timestamp,
						todoUpdateTime: "Haven't Updated Yet",
						label: null,
					},
				],
			},
			{
				columnId: uid(),
				color: "yellow",
				columnName: "In-Progress",
				columnData: [],
			},
			{
				columnId: uid(),
				color: "green",
				columnName: "Completed",
				columnData: [],
			},
		],
	},
}
