import { musicBrainzSearch } from "@/lib/mb"

export default async function Home() {
	const res = await musicBrainzSearch("opiate", "release-group")
	const data = await res.json()

	return (
		<pre>{JSON.stringify(data, null, 2)}</pre>
	)
}
