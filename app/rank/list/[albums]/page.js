export default async function RankList(req) {
	return (
		<pre>{JSON.stringify(req, null, 2)}</pre>
	)
}