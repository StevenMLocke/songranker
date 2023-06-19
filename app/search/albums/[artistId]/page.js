import { spotAuth, getSpotifyAlbums, getSpotifyArtistsAlbumsCount, getSpotifyPaged, getSpotifySeveralAlbums } from "@/lib/spotify"
import { AlbumCard } from "../../components/AlbumCard";
import { CardGrid } from "@/app/components/CardGrid";

export default async function Albums({ params: { artistId } }) {
	const spotId = process.env.SPOTIFY_CLIENT_ID;
	const spotSecret = process.env.SPOTIFY_CLIENT_SECRET;
	const spotToken = await spotAuth(spotId, spotSecret);

	const count = await getSpotifyArtistsAlbumsCount(artistId, spotToken, { include_groups: 'compilation,single,album', })
	const preAlbums = await getSpotifyPaged(count, getSpotifyAlbums, artistId, spotToken, 50, { include_groups: 'compilation,album,single', limit: 50, })
	//collect albumids and get tracks for each
	const albumIds = preAlbums.map((album) => { return album.id })

	//then build album cards
	/* 	const albumCards = albums.map((album) => {
			return (
				<AlbumCard
					key={album.id}
					id={album.id}
					name={album.name}
					imageUrl={album.images.length ? album.images[0].url : null}
					fallbackImage={"/noImage.gif"}
				></AlbumCard>
			)
		}) */

	const [testGroups] = await getSpotifySeveralAlbums(albumIds, spotToken)
	const { albums } = testGroups

	return (
		<>
			{/* <CardGrid items={albumCards}></CardGrid> */}
			<div className="w-[75%] border-4 border-orange-400 break-all">
				<pre className="whitespace-break-spaces">{JSON.stringify(albums, null, 2)}</pre>
			</div>
		</>
	)
}