import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { schemas } from "database";

const c = initContract()

const PostUser = schemas.UserCreateInputSchema

export const users = c.router({
	createUser: {
		method: "POST",
		path: "/users",
		summary: "Create a new user",
		responses: {
			201: c.response<{user: schemas.User, created: true}>(),
			401: c.response<{user: null, created: false}>(),
			400: c.response<{user: null, created: false}>()
		},
		body: PostUser
	},
	listUsers: {
		method: "GET",
		path: "/users",
		summary: "List all users",
		responses: {
			200: c.response<{users: schemas.User[]}>()
		}
	},
	getUser: {
		method: "GET",
		path: "/users/:id",
		summary: "Get a user by id",
		responses: {
			200: c.response<{user: schemas.User}>(),
			404: c.response<{user: null}>()
		},
		pathParams: z.object({
			id: z.string()
		})
	},
})
