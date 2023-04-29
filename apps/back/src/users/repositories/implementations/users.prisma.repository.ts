import { CustomPrismaService } from "nestjs-prisma"
import { UsersRepository } from "../users.repository.interface"
import { PrismaClient } from "database"
import { User } from "../../entities/user.entity"

export class UsersPrismaRepository implements UsersRepository {
	constructor(private readonly prismaService: CustomPrismaService<PrismaClient>) {}

	async create(data: User) {
		return this.prismaService.client.user.create({ data })
	}

	async findMany() {
		return this.prismaService.client.user.findMany()
	}

	async findUnique(id: string) {
		return this.prismaService.client.user.findUnique({ where: { id } })
	}
}
