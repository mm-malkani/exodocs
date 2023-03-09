import { child, get, ref } from "firebase/database"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { db } from "../../../config/firebaseConfig"
import { initialData } from "../../../data/pageInitialDat"
import SharedNewElement from "./SharedNewElement"

const Pages = () => {
	const router = useRouter()
	const { slug } = router.query

	const [dataStore, setDataStore] = useState(initialData["tempPage"])

	const dbRef = ref(db)
	useEffect(() => {
		if (slug) {
			get(
				child(
					dbRef,
					`${slug.substring(33)}/pages/${slug.substring(0, 32)}`
				)
			)
				.then(snapshot => {
					if (snapshot.exists()) {
						// console.log(snapshot.val().storedData)
						let tempDataStore = JSON.parse(
							snapshot.val().storedData
						)
						setDataStore(tempDataStore)
						// console.log(tempDataStore)
					} else {
						console.log("No data available")
						router.push(`${router.asPath}/notFound`)
					}
				})
				.catch(error => {
					console.log(error)
				})
		}
	}, [router, slug])

	return (
		<div className="w-full flex flex-col p-2 space-y-2 min-h-screen overflow-x-hidden">
			<Head>
				<title>{`ExoDocs - ${dataStore.title}`}</title>
			</Head>
			<div className="flex space-x-2 justify-between text-customblack">
				<input
					disabled
					className="font-semibold p-1 text-2xl rounded w-full bg-customwhite"
					value={dataStore.title}
				/>
			</div>

			<div
				id="parentNewElement"
				className="flex flex-col items-center justify-center w-full space-y-2 bg-white overflow-y-auto overflow-x-hidden"
			>
				{dataStore.data.map((data, index, arr) => {
					// console.log(arr.length)
					return (
						<SharedNewElement
							length={arr.length}
							key={data.id}
							{...{
								index,
								data,
							}}
						/>
					)
				})}
			</div>
		</div>
	)
}

export default Pages
