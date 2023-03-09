import Image from "next/image"
import Link from "next/link"

const IndexPageCard = ({ title, slug, type }) => {
	return (
		<div className="bg-customlight shadow-md rounded-md p-2 flex flex-col justify-center items-center hover:scale-105 transition">
			<Image
				height={230}
				width={250}
				src={type === "kanban" ? "/kanbanImage.png" : "/pageImg.png"}
				className="object-cover"
				alt="Kanban/Template"
			/>
			<h3 className="text-xl max-w-full font-medium line-clamp-1 my-2">
				{title}
			</h3>
			<Link
				href={`/${type}/${slug}`}
				className="bg-slate-600 hover:bg-slate-500 transition text-customwhite rounded-md w-1/2 py-2 text-center"
			>
				Open
			</Link>
		</div>
	)
}

export default IndexPageCard
