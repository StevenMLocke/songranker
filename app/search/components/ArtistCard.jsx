import Image from "next/image";
import Link from "next/link";

export function ArtistCard({ imageUrl, fallbackImage, name, id }) {
	return (
		<Link href={`/search/albums/${id}`}>
			<div
				key={id}
				id={id}
				className='card card-bordered w-24 md:w-44 2xl:w-56 bg-base-100 shadow-xl'
			>
				<figure className='flex border-2 border-black'>
					<div className='avatar'>
						<div>
							<Image
								src={imageUrl ? imageUrl : fallbackImage}
								width={640}
								height={640}
								alt={`artist photo`}
							></Image>
						</div>
					</div>
				</figure>
				<div className='flex justify-center grow-0 px-1 mx-1 overflow-hidden'>
					<h3 className='card-title text-xs sm:text-sm md:text:md lg:text-lg'>
						{name}
					</h3>
				</div>
			</div>
		</Link>
	);
}
