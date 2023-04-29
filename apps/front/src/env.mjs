import { z } from "zod"
import { createEnv } from "@t3-oss/env-core"

export const env = createEnv({
	clientPrefix: "NEXT_PUBLIC_",
	server: {
		NODE_ENV: z.enum(["development", "test", "production"])
	},
	client: {
		NEXT_PUBLIC_SUPABASE_ENABLED_AUTH_PROVIDERS: z
			.string()
			.optional()
			.default("")
			.transform((val) => val.split(","))
			.pipe(z.array(z.string().refine((val) => val.length > 0))),
		NEXT_PUBLIC_SUPABASE_URL: z.string().url().min(1),
		NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
		NEXT_PUBLIC_DISABLE_EMAIL_LOGIN: z
			.string()
			.optional()
			.default("true")
			// only allow "true" or "false"
			.refine((s) => s === "true" || s === "false")
			// transform to boolean
			.transform((s) => s === "true")
	},
	runtimeEnv: {
		NODE_ENV: process.env.NODE_ENV,
		NEXT_PUBLIC_SUPABASE_ENABLED_AUTH_PROVIDERS: process.env.NEXT_PUBLIC_SUPABASE_ENABLED_AUTH_PROVIDERS,
		NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
		NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
		NEXT_PUBLIC_DISABLE_EMAIL_LOGIN: process.env.NEXT_PUBLIC_DISABLE_EMAIL_LOGIN
	},
	skipValidation:
		!!process.env.SKIP_ENV_VALIDATION &&
		process.env.SKIP_ENV_VALIDATION !== "false" &&
		process.env.SKIP_ENV_VALIDATION !== "0"
})
