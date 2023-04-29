import { useClient } from "../utils/client"

export default function UsersList() {
	const client = useClient()
	const userQuery = client.users.getSelf.useQuery(["users", "me"])

	return (
		<div>
			{userQuery.isLoading ? (
				<div>Loading...</div>
			) : (
				<ul>
					<li className="text-white">{userQuery.data?.body?.user.name}</li>
				</ul>
			)}
		</div>
	)
}
