import { Module } from "@nestjs/common"
import { UsersController } from "./users.controller"
import { UsersService } from "./users.service"
import { provideUsersRepository } from "./repositories/users.repository.provider"

@Module({
	controllers: [UsersController],
	providers: [UsersService, ...provideUsersRepository()]
})
export class UsersModule {}
