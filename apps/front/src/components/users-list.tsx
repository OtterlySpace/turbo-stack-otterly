import { client } from "../utils/client"

export default function UsersList() {
	const usersQuery = client.users.listUsers.useQuery(["users"])

	return (
		<div>
			{usersQuery.isLoading ? (
				<div>Loading...</div>
			) : (
				<ul>
					{usersQuery.data?.body?.users?.map((user) => (
						<li key={user.id}>{user.name}</li>
					))}
				</ul>
			)}
		</div>
	)
}
