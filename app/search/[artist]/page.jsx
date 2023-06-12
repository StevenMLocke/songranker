import {
	musicBrainzSearch,
	musicBrainzLookup,
	musicBrainzBrowse,
} from "@/lib/mb";

export default async function Page({ params: { artist } }) {
	const artistsPromise = await musicBrainzSearch(artist, "artist", {
		limit: 1,
	});
	const {
		artists: [found],
	} = await artistsPromise.json();

	const recordingsPromise = await musicBrainzLookup(found.id, "artist", {
		inc: "recording-rels",
	});

	const browsePromise = await musicBrainzBrowse(
		"release-groups",
		"artist",
		found.id
	);

	return (
		<>
			<pre>{JSON.stringify(found, null, 2)}</pre>
			<pre>{JSON.stringify(browsePromise, null, 2)}</pre>
		</>
	);
}
