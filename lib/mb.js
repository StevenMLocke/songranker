
import { NextRequest, NextResponse } from "next/server";

export async function musicBrainzSearch(q, entityType) {
	const urlBase = 'https://musicbrainz.org/ws/2/';
	const url = `${urlBase}${entityType}?`
	const params = new URLSearchParams(
		{
			'query': q
		}
	)
	const req = new NextRequest(`${url}${params}`)
	const options = {
		'method': 'get',
		headers: {
			'accept': 'application/json',
			'user-agent': 'developing sort tracks by fav app/a0.0.0.1'
		}
	}

	return fetch(req, options);
}

export async function musicBrainzLookup(mbid, entityType, options = { fmt: json }) {

}