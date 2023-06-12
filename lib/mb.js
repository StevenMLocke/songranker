
import { NextRequest, NextResponse } from "next/server";

export async function musicBrainzSearch(q, entityType, searchOptions = {}) {
	const urlBase = 'https://musicbrainz.org/ws/2/';
	const url = `${urlBase}${entityType}?`
	const params = new URLSearchParams(
		{
			'query': q,
			'fmt': 'json',
			...searchOptions
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
	console.log(req.url)
	return fetch(req, options);
}

export async function musicBrainzLookup(mbid, entityType, mbOptions = { fmt: 'json' }) {
	const urlBase = 'https://musicbrainz.org/ws/2/';
	const url = `${urlBase}${entityType}/${mbid}`
	const params = new URLSearchParams({
		...mbOptions,
		fmt: 'json',
	})
	const req = new NextRequest(`${url}?${params}`)
	const options = {
		'method': 'get',
		headers: {
			'accept': 'application/json',
			'user-agent': 'developing sort tracks by fav app/a0.0.0.1'
		}
	}
	//return fetch(req, options)
	return req.url
}

export async function musicBrainzBrowse(entity, linkedEntity, linkedEntityId, mbOptions = { fmt: 'json' }) {
	const urlBase = 'https://musicbrainz.org/ws/2/';
	const url = `${urlBase}${entity}`
	const params = new URLSearchParams({
		[linkedEntity]: linkedEntityId,
		fmt: 'json',
		limit: 100,
		...mbOptions,
	})


	const req = new NextRequest(`${url}?${params}`)
	const options = {
		'method': 'get',
		headers: {
			'accept': 'application/json',
			'user-agent': 'developing sort tracks by fav app/a0.0.0.1'
		}
	}
	return req.url
}