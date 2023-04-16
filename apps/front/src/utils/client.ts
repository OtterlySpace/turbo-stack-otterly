import { initQueryClient } from "@ts-rest/react-query"
import { router } from "api"

export const client = initQueryClient(router, {
	baseUrl: "http://localhost:3001",
	baseHeaders: {}
})
