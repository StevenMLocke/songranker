import Albums from "@/app/search/albums/[artistId]/page";

export async function getSpotifyArtist(q, token) {
	const url = "https://api.spotify.com/v1/artists/"

	const headers = {
		'Authorization': 'Bearer ' + token.access_token
	}

	const options = {
		method: 'GET',
		headers,
	}

	const res = await fetch(url + q, options)
	const artist = await res.json();

	return artist
}

export async function spotAuth(id, secret) {
	const client_id = id;
	const client_secret = secret;
	const url = 'https://accounts.spotify.com/api/token';

	const authOptions = {
		method: 'POST',
		headers: {
			'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64')
		},
		body: new URLSearchParams({
			'grant_type': 'client_credentials'
		}),
		next: { revalidate: 3600 }
	};

	const res = await fetch(url, authOptions);

	const tokObj = await res.json();

	return tokObj;
}

export async function getSpotifySearchArtistsList(q, token, spotOptions = {}, fetchOptions = {}) {
	const url = "https://api.spotify.com/v1/search?"
	const params = new URLSearchParams({
		'type': 'artist',
		'market': 'US',
		'q': q,
		...spotOptions,
	})
	const headers = {
		'Authorization': 'Bearer ' + token.access_token
	}

	const options = {
		method: 'GET',
		headers,
		...fetchOptions
	}

	const res = await fetch(url + params, options)
	const data = await res.json();
	/* 	return data.artists.items.map((artist) => {
			return {
				id: artist.id,
				name: artist.name,
				images: artist.images,
			}
		}); */
	return data
}

export async function getSpotifyAlbums(artistId, token, spotOptions = {}, fetchOptions = {}) {
	const url = 'https://api.spotify.com/v1/artists/' + artistId + '/albums?';

	const params = new URLSearchParams({
		'market': 'US',
		...spotOptions,
	});

	const headers = {
		'Authorization': 'Bearer ' + token.access_token
	};

	const options = {
		method: 'GET',
		headers,
		...fetchOptions,
	};

	let uri = url + params;

	const res = await fetch(uri, options);
	const { items } = await res.json();
	return items

}

export async function getSpotifyArtistsAlbumsCount(artistId, token, spotOptions = {}, fetchOptions = {}) {
	const url = 'https://api.spotify.com/v1/artists/' + artistId + '/albums?';

	const params = new URLSearchParams({
		'market': 'US',
		limit: 1,
		...spotOptions,
	});

	const headers = {
		'Authorization': 'Bearer ' + token.access_token
	};

	const options = {
		method: 'GET',
		headers,
		...fetchOptions,
	};

	const uri = url + params;
	const res = await fetch(uri, options)

	const { total: count } = await res.json()
	return count
}

export async function getSpotifyTracks(albumId, token, spotOptions = {}, fetchOptions = {}) {
	"use server"
	const url = 'https://api.spotify.com/v1/albums/' + albumId + '/tracks?';

	const params = new URLSearchParams({
		'market': 'US',
		...spotOptions,
	});

	const headers = {
		'Authorization': 'Bearer ' + token.access_token
	};

	const options = {
		method: 'GET',
		headers,
		...fetchOptions,
	};

	let uri = url + params;

	const res = await fetch(uri, options);
	const { items } = await res.json();
	return items
}

export async function getSpotifySeveralAlbums(albumIds, token, spotOptions = {}, fetchOptions = {}) {
	//maximum 20 ids - https://developer.spotify.com/documentation/web-api/reference/get-multiple-albums

	const url = 'https://api.spotify.com/v1/albums?'

	const headers = {
		'Authorization': 'Bearer ' + token.access_token
	};

	const options = {
		method: 'GET',
		headers,
		...fetchOptions,
	};

	const promises = []
	while (albumIds.length > 0) {

		const qString = albumIds.splice(0, 20).toString()
		const params = new URLSearchParams({
			'market': 'US',
			...spotOptions,
		});

		let uri = `${url}ids=${qString}&${params}`

		const res = await fetch(uri, options)

		promises.push(res.json())

		/* 		const { albums } = await res.json()
				return albums.map((album) => {
					return {
						id: album.id,
						name: album.name,
						images: album.images,
						tracks: album.tracks.items.map((track) => {
							return {
								id: track.id,
								name: track.name,
								track_number: track.track_number,
								href: track.href,
							}
						}),
					}
				}) */
		//promises.push(fetch(uri, options))
		//promises.push(uri)


		return await Promise.all(promises)
		//return promises
	}
}

export async function getSpotifyAlbumsAll() { }

export async function getSpotifyPaged(itemCount, cb, cbIdArg, token, limit, spotOptions = {}) {
	const promises = []
	if (itemCount > limit) {
		let i = 0
		do {
			promises.push(cb(cbIdArg, token, { ...spotOptions, limit, offset: i }))
			i += limit
		} while (i < itemCount)

		return (await Promise.all(promises)).flat()
	}

	return await cb(cbIdArg, token, spotOptions)


}