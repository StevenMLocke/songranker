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
			//'Basic MGZkNGNiNzFjZDFiNDAyMjgwMTk5YTk3NDFkYzY5OTY6OTVjZmZkZDcyMjg0NDczMjhiOTQ5OWQ4OGQ5NDNlOTA'
		},
		body: new URLSearchParams({
			'grant_type': 'client_credentials'
		}),
		next: { revalidate: 60 }
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

export async function getSpotifyPaged(itemCount, cb, cbIdArg, token, limit, spotOptions = {}) {
	const promises = []
	if (itemCount > limit) {
		let i = 0
		do {
			promises.push(cb(cbIdArg, token, { limit, offset: i }))
			i += limit
		} while (i < itemCount)

		return (await Promise.all(promises)).flat()
	}

	return await cb(cbIdArg, token, spotOptions)


}