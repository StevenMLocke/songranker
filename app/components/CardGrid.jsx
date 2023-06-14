import Image from "next/image";

export function CardGrid({ items }) {
	return (
		<div className='flex flex-1 flex-wrap w-full gap-2 justify-center'>
			{items.map((item) => {
				return item;
			})}
		</div>
	);
}
