import { child, get, ref } from "firebase/database"
import Head from "next/head"
import { useRouter } from "next/router"
import { useState } from "react"
import { useEffect } from "react"
import { db } from "../../../config/firebaseConfig"
import { dataBase } from "../../../data/kanbanMockData"
import SharedKanbanTodo from "./SharedKanbanTodo"

const Kanban = () => {
	const router = useRouter()
	const { slug } = router.query

	const [initialData, setInitialData] = useState(dataBase["mockData"])
	const [dataStore, setDataStore] = useState(initialData.kanban)

	const dbRef = ref(db)
	useEffect(() => {
		if (slug) {
			get(
				child(
					dbRef,
					`${slug.substring(33)}/kanban/${slug.substring(0, 32)}`
				)
			)
				.then(snapshot => {
					if (snapshot.exists()) {
						// console.log(snapshot.val().storedData)
						let tempDataStore = JSON.parse(
							snapshot.val().storedData
						)
						setInitialData(tempDataStore)
						// console.log(tempDataStore)
						setDataStore(tempDataStore.kanban)
					} else {
						// console.log("No data available")
						router.push(`${router.asPath}/notFound`)
					}
				})
				.catch(error => {
					console.log(error)
				})
		}
		//eslint-disable-next-line
	}, [router, slug])

	return (
		<div className="cursor-default">
			<Head>
				<title>{`ExoDocs - ${initialData.title}`}</title>
			</Head>

			<div className="p-2 h-screen bg-customlight text-customblack">
				<div className="flex space-x-2 justify-between">
					<input
						className="font-semibold p-1 text-2xl rounded bg-customwhite w-full"
						value={initialData.title}
						disabled
					/>
				</div>

				<div
					id="kanbanScrollArea"
					className="flex flex-row space-x-4 w-full min-h-fit py-2 bg-customlight overflow-x-auto"
				>
					{dataStore.map((column, index) => {
						return (
							<div
								key={index}
								className="w-[300px] min-w-[300px] rounded-lg md:w-1/3 h-fit bg-customlight border-2 flex flex-col"
							>
								<h1 className="text-center h-12 rounded bg-customlight w-full flex items-center justify-between px-4 text-customblack text-xl font-semibold">
									<span
										title="Change Color"
										className="space-x-2 flex items-center"
									>
										<span className="relative">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill={column.color}
												viewBox="0 0 24 24"
												strokeWidth={1.5}
												stroke="currentColor"
												className="w-6 h-6 cursor-default"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z"
												/>
											</svg>
										</span>
										<span>{column.columnName}</span>
										<small className="w-[20px] border border-customblack rounded-full text-xs">
											{column.columnData.length}
										</small>
									</span>
									<div className="flex space-x-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-6 h-6 cursor-default"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									</div>
								</h1>

								{column.columnData.length == 0 && (
									<div className="py-10 flex items-center justify-center">
										<span className="text-center font-semibold text-custom-gray">
											No Todos To Display
										</span>
									</div>
								)}

								{column.columnData.length > 0 &&
									column.columnData.map(
										(todoData, todoIndex) => {
											return (
												<SharedKanbanTodo
													{...{
														todoData,
													}}
													key={todoIndex}
													fillColor={column.color}
												></SharedKanbanTodo>
											)
										}
									)}
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default Kanban
