import { spotAuth, getSpotifyAlbums, getSpotifyArtistsAlbumsCount, getSpotifyPaged } from "@/lib/spotify"
import { AlbumCardsClientWrapper } from "../../components/AlbumCardsClientWrapper";

export default async function Albums({ params: { artistId } }) {
	const spotId = process.env.SPOTIFY_CLIENT_ID;
	const spotSecret = process.env.SPOTIFY_CLIENT_SECRET;
	const spotToken = await spotAuth(spotId, spotSecret);

	const count = await getSpotifyArtistsAlbumsCount(artistId, spotToken, { include_groups: 'compilation,single,album', })

	//fetch the albums in parallel to help prevent waterfalls
	const preAlbums = await getSpotifyPaged(count, getSpotifyAlbums, artistId, spotToken, 50, { include_groups: 'compilation,album,single', limit: 50, })

	const allAlbums = []

	preAlbums.forEach((album) => {
		allAlbums.push(
			{
				name: album.name,
				id: album.id,
				artists: album.artists.map((artist) => { return artist.name }).toString(),
				images: album.images,
			}
		)
	})

	return <>
		<AlbumCardsClientWrapper
			albums={allAlbums}
			spotifyToken={spotToken}
		></AlbumCardsClientWrapper>
	</>
}