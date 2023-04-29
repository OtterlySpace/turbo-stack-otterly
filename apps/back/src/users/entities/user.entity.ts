export class User {
	constructor(
		public readonly id: string,
		public readonly email: string,
		public readonly username: string | null,
		public readonly name: string | null
	) {}
}
