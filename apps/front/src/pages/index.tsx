import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { type NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import UsersList from "../components/users-list"

const Home: NextPage = () => {
	const user = useUser()

	const supabase = useSupabaseClient()

	return (
		<>
			<Head>
				<title>🦦 Turbo Stack Otterly</title>
				<meta name="description" content="The best stack made by the Otters from OtterlySpace 🦦" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
				<div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
					<h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
						Turbo Stack Otterly 🦦
					</h1>

					{user ? (
						<div className="flex flex-col items-center justify-center gap-4">
							<UsersList></UsersList>
							<h2 className="text-2xl font-bold text-white">Welcome {user.email}</h2>
							<button
								className="rounded-md bg-[#2e026d] px-4 py-2 text-lg font-semibold text-white"
								onClick={() => void supabase.auth.signOut()}
							>
								Logout
							</button>
						</div>
					) : (
						<Link
							className="rounded-md bg-[#2e026d] px-4 py-2 text-lg font-semibold text-white"
							href="/auth/login"
						>
							Login
						</Link>
					)}
				</div>
			</main>
		</>
	)
}

export default Home
