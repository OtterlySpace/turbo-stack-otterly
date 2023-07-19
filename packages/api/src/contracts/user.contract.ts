import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { schemas } from "database";

const c = initContract()

const PostUser = z.object({
	email: z.string().email(),
	username: z.string().min(1).max(32).optional(),
	name: z.string().min(1).max(128).optional()
})

export const users = c.router({
	createUser: {
		method: "POST",
		path: "/users",
		summary: "Create a new user",
		responses: {
			201: c.type<{user: schemas.User, created: true}>(),
			401: c.type<{user: null, created: false}>(),
			400: c.type<{user: null, created: false}>()
		},
		body: PostUser
	},
	listUsers: {
		method: "GET",
		path: "/users",
		summary: "List all users",
		responses: {
			200: c.type<{users: schemas.User[]}>(),
			401: c.type<{users: null}>(),
			403: c.type<{users: null}>()
		}
	},
	getUser: {
		method: "GET",
		path: "/users/:id",
		summary: "Get a user by id",
		responses: {
			200: c.type<{ user: schemas.User }>(),
			401: c.type<{ users: null }>(),
			403: c.type<{ users: null }>(),
			404: c.type<{user: null}>()
		},
		pathParams: z.object({
			id: z.string()
		})
	},
	getSelf: {
		method: "GET",
		path: "/users/me",
		summary: "Get the current user",
		responses: {
			200: c.type<{user: schemas.User}>(),
			401: c.type<{user: null}>()
		}
	}
})
