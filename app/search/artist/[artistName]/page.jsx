import { spotAuth, getSpotifySearchArtistsList } from "@/lib/spotify";

import { CardGrid } from "@/app/components/CardGrid";
import { ArtistCard } from "../../components/ArtistCard";

export default async function Page({ params }) {
	const artist = decodeURIComponent(params.artistName);
	const spotId = process.env.SPOTIFY_CLIENT_ID;
	const spotSecret = process.env.SPOTIFY_CLIENT_SECRET;
	const spotToken = await spotAuth(spotId, spotSecret);

	const spotArtistsList = await getSpotifySearchArtistsList(artist, spotToken, {
		limit: 10,
	});
	const artistsCards = spotArtistsList.artists.items.map((spotArtist) => {
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
		</>
	);
}
