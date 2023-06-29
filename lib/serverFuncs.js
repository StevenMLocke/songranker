"use server"
import { getSpotifyPaged, getSpotifyTracks, getSpotifyAlbumTrackCount } from "./spotify";

export async function getTracks(albumId, token) {
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