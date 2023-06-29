import Image from "next/image";

export function CardGrid({ items }) {
	return (
		<div className='flex grow-0 flex-wrap w-full gap-2 justify-center max-h-[80cqh] overflow-y-auto border-2 border-black'>
			{items.map((item) => {
				return item;
			})}
		</div>
	);
}
