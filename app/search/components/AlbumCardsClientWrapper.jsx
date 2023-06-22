"use client";
import { CardGrid } from "@/app/components/CardGrid";
import { AlbumCard } from "./AlbumCard";
import { useState, useMemo } from "react";
import Link from "next/link";

export function AlbumCardsClientWrapper({ albums }) {
	const [selectedAlbums, setSelectedAlbums] = useState([]);

	const albumSelectHandler = (album) => {
		setSelectedAlbums((p) => {
			const selectedAlbumsCopy = [...p];
			const existsInd = selectedAlbumsCopy.findIndex(
				(selectedAlbum) => selectedAlbum.id === album.id
			);

			if (existsInd >= 0) {
				selectedAlbumsCopy.splice(existsInd, 1);
			} else {
				selectedAlbumsCopy.push(album);
			}
			return selectedAlbumsCopy;
		});
	};

	const albumCards = useMemo(
		() =>
			albums.map((album) => {
				return (
					<AlbumCard
						key={album.id}
						album={album}
						selectHandler={albumSelectHandler}
						fallbackImage={"/noImage.gif"}
					></AlbumCard>
				);
			}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[albums]
	);

	return (
		<>
			<CardGrid items={albumCards}></CardGrid>
			{/* <pre>{JSON.stringify(selectedAlbums, null, 2)}</pre> */}
		</>
	);
}
