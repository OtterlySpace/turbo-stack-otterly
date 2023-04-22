import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { useRouter } from "next/router"
import { env } from "../../env.mjs"
import { Provider } from "@supabase/supabase-js"
import Head from "next/head"

export default function Login() {
	const supabase = useSupabaseClient()
	const user = useUser()
	const router = useRouter()

	if (user) {
		void router.push("/")
	}

	return (
		<>
			<Head>
				<title>🦦 Turbo Stack Otterly - Login</title>
				<meta name="description" content="The best stack made by the Otters from OtterlySpace 🦦" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="flex min-h-screen flex-col items-center justify-center bg-gray-800">
				<h1 className="mb-4 text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">Login</h1>
				<Auth
					supabaseClient={supabase}
					appearance={{ theme: ThemeSupa }}
					providers={env.NEXT_PUBLIC_SUPABASE_ENABLED_AUTH_PROVIDERS as Provider[]}
					onlyThirdPartyProviders={env.NEXT_PUBLIC_DISABLE_EMAIL_LOGIN}
				/>
			</main>
		</>
	)
}
