import { spotAuth, getSpotifyAlbums } from "@/lib/spotify"
import { AlbumCard } from "../../components/AlbumCard";
import { CardGrid } from "@/app/components/CardGrid";

export default async function Albums({ params: { artistId } }) {
	const spotId = process.env.SPOTIFY_CLIENT_ID;
	const spotSecret = process.env.SPOTIFY_CLIENT_SECRET;
	const spotToken = await spotAuth(spotId, spotSecret);

	const albums = await getSpotifyAlbums(artistId, spotToken)

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
			<pre>{JSON.stringify(albums, null, 2)}</pre>
		</>
	)
}