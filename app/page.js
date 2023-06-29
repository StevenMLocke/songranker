import { authOptions } from "./api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth/next"

export default async function Home() {
	const session = await getServerSession(authOptions)

	return (
		<>
			Things go here
			<pre>{JSON.stringify(session, null, 2)}</pre>

		</>
	)
}
