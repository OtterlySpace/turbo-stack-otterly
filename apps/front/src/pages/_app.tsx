import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { type AppType } from "next/dist/shared/lib/utils"
import { useState } from "react"

import "~/styles/globals.css"

const MyApp: AppType = ({ Component, pageProps }) => {
	const [queryClient] = useState(() => new QueryClient())
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<Component {...pageProps} />
				<ReactQueryDevtools />
			</QueryClientProvider>
		</>
	)
}

export default MyApp
