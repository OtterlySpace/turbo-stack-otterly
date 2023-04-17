import { initQueryClient } from "@ts-rest/react-query"
import contracts from "api"

export const client = initQueryClient(contracts, {
	baseUrl: "http://localhost:3001",
	baseHeaders: {}
})
