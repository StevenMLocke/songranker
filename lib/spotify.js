
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
	return await res.json();
}

//deprecated. left in for dev purposes only
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

	return await res.json();
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
	return await res.json();
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

export async function getSpotifyAlbumTrackCount(albumId, token, spotOptions = {}, fetchOptions = {}) {
	const url = 'https://api.spotify.com/v1/albums/' + albumId;

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

	const uri = `${url}?${params}`;

	const res = await fetch(uri, options)

	const { tracks: { total: count } } = await res.json()
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

//unused
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

	}
	return await Promise.all(promises)
}

//this is used as a wrapped to fetch paged data in parallel
export async function getSpotifyPaged(itemCount, cb, cbIdArg, token, limit, spotOptions = {}, fetchOptions = {}) {
	const promises = []
	if (itemCount > limit) {
		let i = 0
		do {
			promises.push(cb(cbIdArg, token, { ...spotOptions, limit, offset: i }, fetchOptions))
			i += limit
		} while (i < itemCount)

		return (await Promise.all(promises)).flat()
	}

	return await cb(cbIdArg, token, spotOptions)
}