import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { CustomPrismaService } from "nestjs-prisma"
import { PrismaClient } from "database"
import "./env"

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	const prismaService: CustomPrismaService<PrismaClient> = app.get("PrismaService")
	void prismaService.enableShutdownHooks(app)

	// Enable cors
	app.enableCors()

	await app.listen(3001)
}
void bootstrap()
