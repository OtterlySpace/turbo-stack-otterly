import { Inject, Injectable } from "@nestjs/common"
import { schemas } from "database"
import { z } from "zod"
import { USERS_REPOSITORY_TOKEN, UsersRepository } from "./repositories/users.repository.interface"

@Injectable()
export class UsersService {
	constructor(@Inject(USERS_REPOSITORY_TOKEN) private readonly usersRepository: UsersRepository) {}

	async createUser(data: z.infer<typeof schemas.UserCreateInputSchema>) {
		return await this.usersRepository.create(data)
	}

	async listUsers() {
		return await this.usersRepository.findMany()
	}

	async getUser(id: string) {
		return await this.usersRepository.findUnique(id)
	}
}
