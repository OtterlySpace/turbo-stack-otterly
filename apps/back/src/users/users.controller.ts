import { Controller, Get, Post, UseGuards } from "@nestjs/common"
import {
	NestControllerInterface,
	NestRequestShapes,
	TsRest,
	TsRestRequest,
	nestControllerContract
} from "@ts-rest/nest"
import contracts from "api"
import { UsersService } from "./users.service"
import { AuthenticatedGuard } from "../auth/guards/authenticated.guard"
import { JwtGuard } from "../auth/guards/jwt.guard"
import { GetUser } from "./decorators/user.decorator"
import { JwtPayload } from "jsonwebtoken"

const c = nestControllerContract(contracts.users)
type RequestShapes = NestRequestShapes<typeof c>

@Controller("users")
export class UsersController implements NestControllerInterface<typeof c> {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	@UseGuards(JwtGuard, AuthenticatedGuard)
	@TsRest(c.createUser)
	async createUser(@TsRestRequest() { body }: RequestShapes["createUser"], @GetUser() userJwt: JwtPayload) {
		const payload = {
			id: userJwt.sub as string,
			...body
		}
		const user = await this.usersService.createUser(payload)
		return { status: 201 as const, body: { user, created: true as const } }
	}

	@Get()
	@UseGuards(JwtGuard, AuthenticatedGuard)
	@TsRest(c.listUsers)
	async listUsers() {
		const users = await this.usersService.listUsers()
		return { status: 200 as const, body: { users } }
	}

	@Get("me")
	@UseGuards(JwtGuard, AuthenticatedGuard)
	@TsRest(c.getSelf)
	async getSelf(@GetUser() user: JwtPayload) {
		const userDb = await this.usersService.getUser(user.sub as string)
		if (!userDb) return { status: 401 as const, body: { user: null } }
		return { status: 200 as const, body: { user: userDb } }
	}

	@Get(":id")
	@TsRest(c.getUser)
	async getUser(@TsRestRequest() { params: { id } }: RequestShapes["getUser"]) {
		const user = await this.usersService.getUser(id)
		if (!user) return { status: 404 as const, body: { user: null } }
		return { status: 200 as const, body: { user } }
	}
}
