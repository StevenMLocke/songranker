"use client";
export function SongsList({ dismissHandler, songlist }) {
	return (
		<div
			className=' w-full h-[100vh] absolute z-20 backdrop-blur-sm flex items-center border-8 justify-center border-blue-400 top-0'
			onClick={dismissHandler}
		>
			<div
				className='card card-bordered p-2 shadow-lg z-30 prose-2xl'
				onClick={dismissHandler}
			>
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
				<span>{JSON.stringify(songlist, null, 2)}</span>
			</div>
		</div>
	);
}
