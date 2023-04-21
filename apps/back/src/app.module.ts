import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { UsersModule } from "./users/users.module"
import { CustomPrismaModule } from "nestjs-prisma"
import { PrismaClient } from "database"

@Module({
	controllers: [AppController],
	providers: [AppService],
	imports: [
		CustomPrismaModule.forRoot({
			name: "PrismaService",
			isGlobal: true,
			client: new PrismaClient()
		}),
		UsersModule
	]
})
export class AppModule {}
