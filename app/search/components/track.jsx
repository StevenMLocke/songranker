export function Track({ track }) {
	return (
		<a
			href={track.url}
			target={`_blank`}
			className='btn btn-ghost text-xs'
		>
			<p className='prose line-clamp-2'>{track.name}</p>
		</a>
	);
}
