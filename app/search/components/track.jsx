export function Track({ track }) {
	return (
		<a
			href={track.url}
			target={`_blank`}
			className='hover:link'
		>
			<p className='prose line-clamp-2 p-1 m-1'>{track.name}</p>
		</a>
	);
}
