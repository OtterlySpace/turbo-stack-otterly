import { Controller, Get } from "@nestjs/common"
import { AppService } from "./app.service"
import { PrismaService } from "./prisma/prisma.service"

@Controller()
export class AppController {
	constructor(private readonly appService: AppService, private readonly prismaService: PrismaService) {}

	@Get()
	getHello(): string {
		return this.appService.getHello()
	}

	@Get("users")
	getUsers(): Promise<string> {
		return this.prismaService.user.findMany().then((users) => JSON.stringify(users))
	}
}
