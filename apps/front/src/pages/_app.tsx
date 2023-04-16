import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { type AppType } from "next/dist/shared/lib/utils"

import "~/styles/globals.css"

const queryClient = new QueryClient()

const MyApp: AppType = ({ Component, pageProps }) => {
	return (
		<QueryClientProvider client={queryClient}>
			<Component {...pageProps} />
			<ReactQueryDevtools />
		</QueryClientProvider>
	)
}

export default MyApp
