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
		"release-group",
		"artist",
		found.id,
		{ type: "album" }
	);

	const { ["release-groups"]: releaseGroups } = await browsePromise.json();

	const filteredGroups = releaseGroups.map((group) => {
		return { id: group.id, title: group.title };
	});

	const { id, name } = found;
	const test = { arid: id, name };

	return (
		<>
			<pre>{JSON.stringify(test, null, 2)}</pre>
			<pre>{JSON.stringify(filteredGroups, null, 2)}</pre>
		</>
	);
}
