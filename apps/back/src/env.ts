import { createEnv } from "@t3-oss/env-core"
import { z } from "zod"

export const env = createEnv({
	clientPrefix: "PUBLIC_",
	client: {},
	server: {
		DATABASE_URL: z.string().min(1),
		SUPABASE_JWT_SECRET: z.string().min(1)
	},
	runtimeEnv: process.env
})
