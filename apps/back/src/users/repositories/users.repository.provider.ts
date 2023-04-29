import { Inject, Injectable, Provider } from "@nestjs/common"
import { USERS_REPOSITORY_TOKEN } from "./users.repository.interface"
import { UsersPrismaRepository } from "./implementations/users.prisma.repository"
import { PrismaClient } from "database"
import { CustomPrismaService } from "nestjs-prisma"

export function provideUsersRepository(): Provider[] {
	return [
		{
			provide: USERS_REPOSITORY_TOKEN,
			useFactory: (dependenciesProvider: UsersRepoDependenciesProvider) =>
				provideUsersRepositoryFactory(dependenciesProvider),
			inject: [UsersRepoDependenciesProvider]
		},
		UsersRepoDependenciesProvider
	]
}

function provideUsersRepositoryFactory(dependenciesProvider: UsersRepoDependenciesProvider) {
	return new UsersPrismaRepository(dependenciesProvider.prismaService)
}

@Injectable()
export class UsersRepoDependenciesProvider {
	constructor(
		@Inject("PrismaService")
		public prismaService: CustomPrismaService<PrismaClient>
	) {}
}
