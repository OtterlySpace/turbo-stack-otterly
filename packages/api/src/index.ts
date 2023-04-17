import { users } from './contracts/user.contract'
import { initContract } from '@ts-rest/core'

const c = initContract()

const contracts = {
	users
}

export const router = c.router(contracts)

export default contracts
