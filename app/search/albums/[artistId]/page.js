import { spotAuth, getSpotifyAlbums, getSpotifyArtistsAlbumsCount, getSpotifyPaged, getSpotifySeveralAlbums, getSpotifyAlbumTrackCount, getSpotifyTracks } from "@/lib/spotify"
import { AlbumCard } from "../../components/AlbumCard";
import { CardGrid } from "@/app/components/CardGrid";
import { AlbumCardsClientWrapper } from "../../components/AlbumCardsClientWrapper";
import { NextRequest } from "next/server";

export default async function Albums({ params: { artistId } }) {
	const spotId = process.env.SPOTIFY_CLIENT_ID;
	const spotSecret = process.env.SPOTIFY_CLIENT_SECRET;
	const spotToken = await spotAuth(spotId, spotSecret);

	const count = await getSpotifyArtistsAlbumsCount(artistId, spotToken, { include_groups: 'compilation,single,album', })

	//fetch the albums in parallel to help prevent waterfalls
	const preAlbums = await getSpotifyPaged(count, getSpotifyAlbums, artistId, spotToken, 50, { include_groups: 'compilation,album,single', limit: 50, })

	//get albums and their tracks by album id. tracks can't be fetched when getting albums by artist as done above.

	const allAlbums = []

	for (const album of preAlbums) {
		const trackCount = await getSpotifyAlbumTrackCount(album.id, spotToken, { limit: 1 })
		album.tracks = await getSpotifyPaged(trackCount, getSpotifyTracks, album.id, spotToken, 50, { limit: 50 })
	}


	preAlbums.forEach((album) => {
		allAlbums.push(
			{
				name: album.name,
				id: album.id,
				artists: album.artists.map((artist) => { return artist.name }).toString(),
				images: album.images,
				tracks: album.tracks.map((track) => {
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

	return <>
		{/* <pre>{JSON.stringify(preAlbums, null, 2)}</pre> */}
		<AlbumCardsClientWrapper albums={allAlbums}></AlbumCardsClientWrapper>
	</>
}