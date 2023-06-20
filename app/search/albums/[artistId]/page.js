import { spotAuth, getSpotifyAlbums, getSpotifyArtistsAlbumsCount, getSpotifyPaged, getSpotifySeveralAlbums } from "@/lib/spotify"
import { AlbumCard } from "../../components/AlbumCard";
import { CardGrid } from "@/app/components/CardGrid";

export default async function Albums({ params: { artistId } }) {
	const spotId = process.env.SPOTIFY_CLIENT_ID;
	const spotSecret = process.env.SPOTIFY_CLIENT_SECRET;
	const spotToken = await spotAuth(spotId, spotSecret);

	const count = await getSpotifyArtistsAlbumsCount(artistId, spotToken, { include_groups: 'compilation,single,album', })

	//fetch the albums in parallel to help prevent waterfalls
	const preAlbums = await getSpotifyPaged(count, getSpotifyAlbums, artistId, spotToken, 50, { include_groups: 'compilation,album,single', limit: 50, })

	const albumIds = preAlbums.map((album) => { return album.id })

	//get albums and their tracks by album id. tracks can't be fetched when getting albums by artist as done above.
	const allAlbumsRes = await getSpotifySeveralAlbums(albumIds, spotToken)

	const allAlbums = []
	allAlbumsRes.forEach((albumsSet) => {
		albumsSet.albums.forEach((album) => {
			allAlbums.push(
				{
					name: album.name,
					id: album.id,
					artists: album.artists.map((artist) => { return artist.name }).toString(),
					images: album.images,
					tracks: album.tracks.items.map((track) => {
						return {
							id: track.id,
							name: track.name,
							track_number: track.track_number,
							url: track.external_urls.spotify,
						}
					})
				}
			)
		})
	})

	const albumCards = allAlbums.map((album) => {
		return (
			<AlbumCard
				key={album.id}
				album={album}
				fallbackImage={"/noImage.gif"}
			></AlbumCard>
		)
	})

	return <CardGrid items={albumCards}></CardGrid>
}