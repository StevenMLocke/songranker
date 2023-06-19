import { AlbumCard } from "@/app/search/components/AlbumCard"
import { SongsList } from "@/app/search/components/songsList"

export default async function Page() {
	return (
		<>
			<SongsList></SongsList>
			Huhlo, wolrdt!
			<AlbumCard
				name={'7bu3H8JO7d0UbMoVzbo70s'}
				fallbackImage={'/noImage.gif'}
				key={'7bu3H8JO7d0UbMoVzbo70s'}
				id={'7bu3H8JO7d0UbMoVzbo70s'}
			></AlbumCard>
		</>
	)
}