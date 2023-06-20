import Image from "next/image";

export function CardGrid({ items }) {
	return (
		<div className='flex grow-0 flex-wrap w-full gap-2 justify-center max-h-[80cqh] 2xl:max-h-[88.5cqh] overflow-y-auto'>
			{items.map((item) => {
				return item;
			})}
		</div>
	);
}
