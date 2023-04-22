import { useSession } from "@supabase/auth-helpers-react"
import { InitClientReturn, initQueryClient } from "@ts-rest/react-query"
import contracts from "api"
import { FunctionComponent, ReactElement, createContext, useContext, useEffect, useState } from "react"

type Client = InitClientReturn<
	typeof contracts,
	{
		baseUrl: string
		baseHeaders: {
			"Content-Type": "application/json"
			Authorization?: string
		}
	}
>

export type ClientContextProps = {
	client: Client
}

export const ClientContext = createContext<Partial<ClientContextProps>>({})

export const ClientProvider: FunctionComponent<{ children: ReactElement | ReactElement[] }> = ({ children }) => {
	const userSession = useSession()

	let supabaseToken =
		typeof window !== "undefined" &&
		window.document.cookie
			.split("; ")
			.find((row) => row.startsWith("supabase-auth-token="))
			?.split("=")[1]

	if (supabaseToken) {
		supabaseToken = (JSON.parse(decodeURIComponent(supabaseToken)) as string[])?.[0]
	}

	const [client, setClient] = useState<Client>(
		initQueryClient(contracts, {
			baseUrl: "http://localhost:3001",
			baseHeaders: {
				"Content-Type": "application/json",
				...(supabaseToken && { Authorization: `Bearer ${supabaseToken}` })
			}
		})
	)

	useEffect(() => {
		if (userSession) {
			setClient(
				initQueryClient(contracts, {
					baseUrl: "http://localhost:3001",
					baseHeaders: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${userSession.access_token}`
					}
				})
			)
		} else if (supabaseToken) {
			setClient(
				initQueryClient(contracts, {
					baseUrl: "http://localhost:3001",
					baseHeaders: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${supabaseToken}`
					}
				})
			)
		} else {
			{
				setClient(
					initQueryClient(contracts, {
						baseUrl: "http://localhost:3001",
						baseHeaders: {
							"Content-Type": "application/json"
						}
					})
				)
			}
		}
	}, [userSession, supabaseToken])

	return (
		<ClientContext.Provider
			value={{
				client
			}}
		>
			{children}
		</ClientContext.Provider>
	)
}

export const useClient = (): Client => {
	const { client } = useContext(ClientContext)

	if (!client) {
		throw new Error("Client not found")
	}

	return client
}
