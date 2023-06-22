"use server"
import { spotAuth, getSpotifyPaged, getSpotifyTracks, getSpotifyAlbumTrackCount } from "./spotify";

export async function getTracks(albumId) {
	const id = process.env.SPOTIFY_CLIENT_ID
	const sec = process.env.SPOTIFY_CLIENT_SECRET

	const token = await spotAuth(id, sec)

	const count = await getSpotifyAlbumTrackCount(albumId, token)

	const rawTracks = await getSpotifyPaged(count, getSpotifyTracks, albumId, token, 50)
	return rawTracks.map((track) => {
		return {
			id: track.id,
			name: track.name,
			track_number: track.track_number,
			url: track.external_urls.spotify,
			uri: track.uri
		}
	})
}