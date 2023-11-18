import { compare, hash } from 'bcryptjs';

export class User {
	private _password: string;
	constructor(
		private readonly _email: string,
		private readonly _name: string,
	) {}
	get email(): string {
		return this._email;
	}

	get name(): string {
		return this._name;
	}

	get password(): string {
		return this._password;
	}

	public async setPassword(pass: string, salt: number): Promise<void> {
		console.log(salt);

		this._password = await hash(pass, salt);
	}

	public async checkPassword(pass: string, hash: string): Promise<boolean> {
		const isTheSamePassword = await compare(pass, hash).then((res) => res === true);
		if (!isTheSamePassword) {
			return false;
		}
		return true;
	}
}
