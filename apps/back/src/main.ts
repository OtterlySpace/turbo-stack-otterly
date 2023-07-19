import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import "./env"

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	// Enable cors
	app.enableCors()

	await app.listen(3001)
}
void bootstrap()
