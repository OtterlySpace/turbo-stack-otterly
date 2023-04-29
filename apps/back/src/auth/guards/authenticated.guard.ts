import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common"
import { Request } from "express"

export class AuthenticatedGuard implements CanActivate {
	canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest<Request>()

		if (!request?.user) {
			throw new UnauthorizedException()
		}

		return true
	}
}
