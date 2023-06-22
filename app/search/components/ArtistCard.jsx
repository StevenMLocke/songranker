import Image from "next/image";
import Link from "next/link";

export function ArtistCard({ imageUrl, fallbackImage, name, id }) {
	return (
		<Link
			href={`/search/albums/${id}`}
			key={id}
			id={id}
			className='card card-compact card-bordered w-40 bg-base-100 shadow-xl overflow-hidden'
		>
			<figure className='flex'>
				<div className='avatar border-b-2 border-black'>
					<div>
						<Image
							src={imageUrl ? imageUrl : fallbackImage}
							width={320}
							height={320}
							alt={`artist photo`}
						></Image>
					</div>
				</div>
			</figure>
			<div className='flex flex-1 justify-center items-center mx-1'>
				<p className='card-title line-clamp-3 text-xs sm:text-sm xl:text-base 2xl:text-lg break-words text-center '>
					{name}
				</p>
			</div>
		</Link>
	);
}
