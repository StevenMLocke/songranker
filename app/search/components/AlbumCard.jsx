"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { SongsList } from "./songsList";

export function AlbumCard({ imageUrl, fallbackImage, name, id }) {
	const [songListVis, setSongListVis] = useState(false);
	const cardRef = useRef();
	const dismissHandler = () => {
		setSongListVis(false);
	};
	return (
		<>
			{songListVis && <SongsList dismissHandler={dismissHandler}></SongsList>}
			<div
				ref={cardRef}
				key={id}
				id={id}
				className='card card-bordered w-60 bg-base-100 shadow-xl'
				onClick={() => {
					setSongListVis((p) => !p);
				}}
			>
				<figure className='flex'>
					<div className='avatar border-b-2 border-black'>
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
				<div className='flex justify-center grow-0 px-1 mx-1 '>
					<h3 className='card-title text-xs sm:text-sm md:text:md lg:text-lg break-all'>
						{name}
					</h3>
				</div>
				<pre>{JSON.stringify(songListVis, null, 2)}</pre>
			</div>
		</>
	);
}
