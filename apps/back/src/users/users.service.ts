import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { schemas } from "database"
import { z } from "zod"

@Injectable()
export class UsersService {
	constructor(private readonly prismaService: PrismaService) {}

	async createUser(data: z.infer<typeof schemas.UserCreateInputSchema>) {
		return await this.prismaService.user.create({ data })
	}

	async listUsers() {
		return await this.prismaService.user.findMany()
	}

	async getUser(id: string) {
		return await this.prismaService.user.findUnique({ where: { id } })
	}
}
