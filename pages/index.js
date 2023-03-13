import { onAuthStateChanged } from "firebase/auth"
import { child, get, ref } from "firebase/database"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import IndexPageCard from "../components/atoms/IndexPageCard"
import LoginFirst from "../components/LoginFirst"
import { auth, db } from "../config/firebaseConfig"

const Home = () => {
	const [login, setLogin] = useState("")
	const [dataList, setDataList] = useState([])
	const router = useRouter()

	useEffect(() => {
		onAuthStateChanged(auth, user => {
			if (user) {
				setLogin(true)
				localStorage.setItem("user", JSON.stringify(user))
				let dataListArr = []
				const dbRef = ref(db)
				get(child(dbRef, `${user.uid}/`))
					.then(snapshot => {
						if (snapshot.exists()) {
							setDataList([])
							let data = Object.entries(snapshot.val())
							data.map(obj => {
								let objectArray = Object.values(obj[1])
								// console.log(objectArray)
								objectArray.map(finalArray => {
									// console.log(finalArray)
									let ArrayData = JSON.parse(
										finalArray.storedData
									)
									dataListArr.push(ArrayData)
									setDataList(dataListArr)
									// console.log(ArrayData)
								})
							})
						} else {
							setDataList([])
							// console.log("No data available")
						}
					})
					.catch(error => {
						console.error(error)
					})
				// console.log(user);
			} else {
				setLogin(false)
			}
		})
	}, [router])

	return (
		<>
			<Head>
				<title>ExoDocs - Professional Docs Sharing App Online</title>
				<meta
					name="description"
					content="ExoDocs - Professional Docs Sharing App Online"
				/>
				<link
					rel="icon/png"
					href="/favicon.ico"
				/>
			</Head>

			{login && (
				<div className="container mx-auto p-2 md:p-8 sm:p-4 bg-customwhite text-slate-800">
					<h3 className="font-bold mb-8 text-center">
						Welcome to my ExoDocs - Your goto Todo builder and
						Sharing App!
					</h3>
					<div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
						{dataList.map((data, index) => {
							// console.log(data.slug.length)
							if (data) {
								if (data.slug.length > 0) {
									return (
										<IndexPageCard
											title={data.title}
											key={index}
											slug={data.slug}
											type={data.type}
										/>
									)
								}
							}
						})}
					</div>
				</div>
			)}
			{!login && <LoginFirst />}
		</>
	)
}

export default Home
