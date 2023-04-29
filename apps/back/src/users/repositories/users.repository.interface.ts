import { User } from "../entities/user.entity"

export interface UsersRepository {
	create(data: Partial<User>): Promise<User>
	findMany(): Promise<User[]>
	findUnique(id: string): Promise<User | null>
}

export const USERS_REPOSITORY_TOKEN = "USERS_REPOSITORY_TOKEN"
