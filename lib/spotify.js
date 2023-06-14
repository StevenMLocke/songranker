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
		next: { revalidate: 3600 }
	};

	const res = await fetch(url, authOptions);

	const tokObj = await res.json();

	return tokObj;
}

export async function getSpotifySearchArtistsList(q, token) {
	const url = "https://api.spotify.com/v1/search?"
	const params = new URLSearchParams({
		'type': 'artist',
		'market': 'US',
		'q': q
	})
	const headers = {
		'Authorization': 'Bearer ' + token.access_token
	}

	const options = {
		method: 'GET',
		headers,
	}

	const res = await fetch(url + params, options)
	const data = await res.json();
	return data.artists.items.map((artist) => {
		return {
			id: artist.id,
			name: artist.name,
			images: artist.images,
		}
	});
}

export async function getSpotifyAlbums(artistId, token) {
	const url = 'https://api.spotify.com/v1/artists/' + artistId + '/albums?';

	const params = new URLSearchParams({
		'include_groups': 'album',
		'market': 'US'
	});

	const headers = {
		'Authorization': 'Bearer ' + token.access_token
	};

	const options = {
		method: 'GET',
		headers,
	};

	let uri = url + params;

	const albumIdsArr = [];

	do {
		let res = await fetch(uri, options);

		let albumsData = await res.json();
		const { items } = albumsData

		if (Array.isArray(items)) {
			albumIdsArr.push(...items)
		}

		uri = albumsData.next ? albumsData.next : null;

	} while (uri);

	return albumIdsArr
}