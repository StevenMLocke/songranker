"use client";
import { useRef, useEffect } from "react";
import { Track } from "./track";

export function TracksList({
	vis,
	dismissHandler,
	tracksList,
	artistName,
	albumName,
}) {
	const dialogRef = useRef();

	useEffect(() => {
		if (vis) {
			dialogRef.current.showModal();
		} else {
			dialogRef.current.close();
		}
	}, [vis]);

	return (
		<dialog
			ref={dialogRef}
			onClick={dismissHandler}
			className='modal'
		>
			<div className='flex justify-center max-h-[90cqh] border-4 border-yellow-400 w-full'>
				<div className='card card-bordered p-2 shadow-lg max-h-full lg:max-w-[50%] z-30 prose-2xl bg-neutral-100'>
					<div className='card-title flex gap-2 border-b-2 border-black justify-between'>
						<h3>
							{artistName} - {albumName}
						</h3>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='stroke-current flex-shrink-0 h-6 w-6'
							fill='none'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
							/>
						</svg>
					</div>
					<div className='overflow-y-auto prose'>
						<ul className='ml-7 list-decimal list-outside '>
							{tracksList.map((track) => {
								return (
									<li
										key={track.id}
										className='list-item'
									>
										<Track track={track}></Track>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			</div>
		</dialog>
	);
}
