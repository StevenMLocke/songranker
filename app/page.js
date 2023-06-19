import { spotAuth } from "@/lib/spotify"
export default async function Home() {
	const token = await spotAuth(process.env.SPOTIFY_CLIENT_ID, process.env.SPOTIFY_CLIENT_SECRET)
	return (
		<>
			Things go here
			{JSON.stringify(token, null, 2)}
		</>
	)
}
