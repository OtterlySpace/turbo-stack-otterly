import { CanActivate, ExecutionContext } from "@nestjs/common"
import { Request } from "express"
import * as jwt from "jsonwebtoken"
import { env } from "../../env"

export class JwtGuard implements CanActivate {
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<Request>()
		const token = this.extractTokenFromHeader(request)
		if (!token) {
			return true
		}
		try {
			const payload = await new Promise<jwt.JwtPayload>((resolve, reject) => {
				jwt.verify(
					token,
					env.SUPABASE_JWT_SECRET,
					{
						algorithms: ["HS256"]
					},
					(err, payload) => {
						if (err) {
							reject(err)
						} else {
							resolve(payload as jwt.JwtPayload)
						}
					}
				)
			})

			// 💡 We're assigning the payload to the request object here
			// so that we can access it in our route handlers
			request.user = payload
		} catch (err) {
			return true
		}
		return true
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		const [type, token] = request.headers.authorization?.split(" ") ?? []
		return type === "Bearer" ? token : undefined
	}
}
