export function Track({ track }) {
	return (
		<a
			href={track.url}
			target={`_blank`}
			className='btn btn-xs btn-ghost text-xs'
		>
			{track.name}
		</a>
	);
}
