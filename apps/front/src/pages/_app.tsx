import { Session, createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { SessionContextProvider } from "@supabase/auth-helpers-react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { type AppType } from "next/dist/shared/lib/utils"
import { useState } from "react"

import "~/styles/globals.css"
import { ClientProvider } from "../utils/client"

const MyApp: AppType<{
	initialSession: Session
}> = ({ Component, pageProps }) => {
	const [queryClient] = useState(() => new QueryClient())
	const [supabaseClient] = useState(() => createBrowserSupabaseClient())
	return (
		<SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession}>
			<QueryClientProvider client={queryClient}>
				<ClientProvider>
					<Component {...pageProps} />
					<ReactQueryDevtools />
				</ClientProvider>
			</QueryClientProvider>
		</SessionContextProvider>
	)
}

export default MyApp
