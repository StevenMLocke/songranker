import {
	musicBrainzSearch,
	musicBrainzLookup,
	musicBrainzBrowse,
} from "@/lib/mb";

import {
	spotAuth,
	getSpotifyArtist,
	getSpotifySearchArtistsList,
} from "@/lib/spotify";

import { CardGrid } from "@/app/components/CardGrid";
import { ArtistCard } from "../../components/ArtistCard";

export default async function Page({ params }) {
	const artist = decodeURIComponent(params.artistName);
	/* 	const artistsPromise = await musicBrainzSearch(
		decodeURIComponent(artist),
		"artist",
		{
			limit: 1,
		}
	);

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
		{ type: "album|ep" }
	);

	const { ["release-groups"]: releaseGroups } = await browsePromise.json();

	const filteredGroups = releaseGroups.filter((group) => {
		return (
			group["secondary-types"][0] !== "Live" &&
			group["secondary-types"][0] !== "Compilation" &&
			group["secondary-types"][0] !== "Remix" &&
			group["secondary-types"][0] !== "Demo"
		);
	}) 
		.map((group) => {
			return { id: group.id, title: group.title };
		})

	const { id, name } = found;
	const test = { arid: id, name };
 */
	const spotId = process.env.SPOTIFY_CLIENT_ID;
	const spotSecret = process.env.SPOTIFY_CLIENT_SECRET;
	const spotToken = await spotAuth(spotId, spotSecret);

	const spotArtistsList = await getSpotifySearchArtistsList(artist, spotToken);
	const artistsCards = spotArtistsList.map((spotArtist) => {
		return (
			<ArtistCard
				fallbackImage={"/noImage.gif"}
				id={spotArtist.id}
				key={spotArtist.id}
				imageUrl={spotArtist.images.length ? spotArtist.images[0].url : null}
				name={spotArtist.name}
			></ArtistCard>
		);
	});

	return (
		<>
			<CardGrid items={artistsCards}></CardGrid>
			{/* <pre>{JSON.stringify(artist, null, 2)}</pre> */}
			{/* <pre>{JSON.stringify(spotId, null, 2)}</pre> */}
			{/* <pre>{JSON.stringify(spotSecret, null, 2)}</pre> */}
			{/* <pre>{JSON.stringify(spotToken, null, 2)}</pre> */}
			{/* <pre>{JSON.stringify(spotArtistsList, null, 2)}</pre> */}
		</>
	);
}
