import { spotAuth, getSpotifyAlbums, getSpotifyArtistsAlbumsCount, getSpotifyPaged } from "@/lib/spotify"
import { AlbumCard } from "../../components/AlbumCard";
import { CardGrid } from "@/app/components/CardGrid";

export default async function Albums({ params: { artistId } }) {
	const spotId = process.env.SPOTIFY_CLIENT_ID;
	const spotSecret = process.env.SPOTIFY_CLIENT_SECRET;
	const spotToken = await spotAuth(spotId, spotSecret);

	const count = await getSpotifyArtistsAlbumsCount(artistId, spotToken, { include_groups: 'compilation,single,album', })
	const albums = await getSpotifyPaged(count, getSpotifyAlbums, artistId, spotToken, 50, { include_groups: 'compilation,album', limit: 50, })
	const albumCards = albums.map((album) => {
		return (
			<AlbumCard
				key={album.id}
				id={album.id}
				name={album.name}
				imageUrl={album.images.length ? album.images[0].url : null}
				fallbackImage={"/noImage.gif"}
			></AlbumCard>
		)
	})

	return (
		<>
			<CardGrid items={albumCards}></CardGrid>
			{/* <pre>{JSON.stringify(testData, null, 2)}</pre> */}
		</>
	)
}