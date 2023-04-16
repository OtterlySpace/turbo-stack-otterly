import { useQuery } from "@tanstack/react-query"
import { client } from "../utils/client"

export default function UsersList() {
	// Sample with standard useQuery and fetch
	// const usersQuery2 = useQuery(["users"], () => {
	// 	return fetch("http://localhost:3001/users").then(async (res) => ({
	// 		data: { body: { users: await res.json() } }
	// 	}))
	// })

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
