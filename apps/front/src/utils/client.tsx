import { useSession } from "@supabase/auth-helpers-react"
import { ApiFetcherArgs, tsRestFetchApi } from "@ts-rest/core"
import { InitClientReturn, initQueryClient } from "@ts-rest/react-query"
import contracts from "api"
import { FunctionComponent, ReactElement, createContext, useContext, useMemo } from "react"

type Client = InitClientReturn<
	typeof contracts,
	{
		baseUrl: string
		baseHeaders: {
			"Content-Type": "application/json"
			Authorization?: string
		}
		api: typeof tsRestFetchApi
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

	const getAuthToken = useMemo(() => {
		if (userSession) {
			return userSession.access_token
		} else if (supabaseToken) {
			return supabaseToken
		} else {
			return undefined
		}
	}, [userSession, supabaseToken])

	const client = useMemo<Client>(
		() =>
			initQueryClient(contracts, {
				baseUrl: "http://localhost:3001",
				baseHeaders: {
					"Content-Type": "application/json",
					...(getAuthToken && { Authorization: `Bearer ${getAuthToken}` })
				},
				api: async (args: ApiFetcherArgs) => {
					args.headers = {
						...args.headers,
						...(getAuthToken && { Authorization: `Bearer ${getAuthToken}` })
					}

					return tsRestFetchApi(args)
				}
			}),
		[getAuthToken]
	)

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
