import { Controller, Get, Post } from "@nestjs/common"
import {
	NestControllerInterface,
	NestRequestShapes,
	TsRest,
	TsRestRequest,
	nestControllerContract
} from "@ts-rest/nest"
import { UserContract } from "api"
import { UsersService } from "./users.service"

const c = nestControllerContract(UserContract)
type RequestShapes = NestRequestShapes<typeof c>

@Controller("users")
export class UsersController implements NestControllerInterface<typeof c> {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	@TsRest(c.createUser)
	async createUser(@TsRestRequest() { body }: RequestShapes["createUser"]) {
		const user = await this.usersService.createUser(body)
		return { status: 201 as const, body: { user, created: true as const } }
	}

	@Get()
	@TsRest(c.listUsers)
	async listUsers() {
		const users = await this.usersService.listUsers()
		return { status: 200 as const, body: { users } }
	}

	@Get(":id")
	@TsRest(c.getUser)
	async getUser(@TsRestRequest() { params: { id } }: RequestShapes["getUser"]) {
		const user = await this.usersService.getUser(id)
		if (!user) return { status: 404 as const, body: { user: null } }
		return { status: 200 as const, body: { user } }
	}
}
