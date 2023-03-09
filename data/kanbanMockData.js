import { uid } from "uid"
const timestamp = Date().toString().slice(0, -30)

export const dataBase = {
	mockData: {
		type: "kanban",
		favourite: true,
		slug: "",
		creator: "abhiborana.a@gmail.com",
		title: "UNTITLED",
		kanban: [
			{
				columnId: uid(),
				color: "red",
				columnName: "Not Started",
				columnData: [
					{
						todoId: uid(),
						todoHeading: "Task 1",
						todoDescription:
							"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam nam itaque dolorem.",
						todoCreationTime: timestamp,
						todoUpdateTime: "Haven't Updated Yet",
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
