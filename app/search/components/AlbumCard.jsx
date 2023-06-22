"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { TracksList } from "./tracksList";

export function AlbumCard({ album, fallbackImage, selectHandler }) {
	const [tracksListVis, setTracksListVis] = useState(false);
	const [albumSelected, setAlbumSelected] = useState(false);
	const cardRef = useRef();
	const dismissHandler = () => {
		setTracksListVis(false);
	};
	return (
		<>
			<TracksList
				vis={tracksListVis}
				dismissHandler={dismissHandler}
				tracksList={album.tracks}
				albumName={album.name}
				artistName={album.artists}
			></TracksList>

			<div
				ref={cardRef}
				key={album.id}
				id={album.id}
				className='card card-compact card-bordered w-40 bg-base-100 shadow-xl overflow-hidden'
			>
				<div
					className='absolute border-4 border-accent-focus bg-gray-400 bg-opacity-60 top-2 right-2 rounded-full w-8 h-8 z-10'
					onClick={() => selectHandler(album)}
				></div>
				<figure className='flex'>
					<div className='avatar border-b-2 border-black'>
						<div>
							<Image
								src={
									album?.images[0].url ? album?.images[0].url : fallbackImage
								}
								width={160}
								height={160}
								alt={`artist photo`}
							></Image>
						</div>
					</div>
				</figure>
				<div className='flex flex-col flex-1 justify-between'>
					<div className='flex flex-1 justify-center items-center mx-1'>
						<p className='card-title line-clamp-3 text-xs sm:text-sm xl:text-base 2xl:text-lg break-words text-center '>
							{album.name}
						</p>
					</div>
					<div
						className='border-t-2 border-black bg-neutral-200 flex justify-center px-1 hover:cursor-pointer'
						onClick={() => {
							setTracksListVis((p) => !p);
						}}
					>
						Tracks List
					</div>
				</div>
			</div>
		</>
	);
}
