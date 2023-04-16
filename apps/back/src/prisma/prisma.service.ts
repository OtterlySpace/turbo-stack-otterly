import { INestApplication, Injectable, Logger, OnModuleInit } from "@nestjs/common"
import { PrismaClient } from "database"

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
	private logger = new Logger(PrismaService.name)
	async onModuleInit() {
		await this.$connect()
		this.logger.log("Connected to database")
	}

	enableShutdownHooks(app: INestApplication) {
		this.$on("beforeExit", async () => {
			await app.close()
		})
	}
}
