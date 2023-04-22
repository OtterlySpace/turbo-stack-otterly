import { useClient } from "../utils/client"

export default function UsersList() {
	const client = useClient()
	const usersQuery = client.users.listUsers.useQuery(["users"])

	return (
		<div>
			{usersQuery.isLoading ? (
				<div>Loading...</div>
			) : (
				<ul>
					{usersQuery.data?.body?.users?.map((user) => (
						<li key={user.id} className="text-white">
							{user.name}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}
