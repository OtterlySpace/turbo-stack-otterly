import { Inject, Injectable } from "@nestjs/common"
import { PrismaClient, schemas } from "database"
import { CustomPrismaService } from "nestjs-prisma"
import { z } from "zod"

@Injectable()
export class UsersService {
	constructor(@Inject("PrismaService") private readonly prismaService: CustomPrismaService<PrismaClient>) {}

	async createUser(data: z.infer<typeof schemas.UserCreateInputSchema>) {
		return await this.prismaService.client.user.create({ data })
	}

	async listUsers() {
		return await this.prismaService.client.user.findMany()
	}

	async getUser(id: string) {
		return await this.prismaService.client.user.findUnique({ where: { id } })
	}
}
