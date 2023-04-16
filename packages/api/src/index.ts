import { UserContract } from './contracts/user.contract'
import { initContract } from '@ts-rest/core'

const c = initContract()

const router = c.router({
	users: UserContract
})

export {
	router,
	UserContract
}
