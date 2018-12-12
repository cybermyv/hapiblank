import * as Bcrypt from 'bcryptjs';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export interface IUser {
	id: number;
	login: string;
	password: string;
	nodelink?: number;
}

@Entity()
export default class User implements IUser {
	@PrimaryGeneratedColumn() id: number;

	@Column() login: string;

	@Column() password: string;

	@Column() nodelink: number;


 hashPassword = (password: string): string => {
	if (!password) {
		return null;
	}
	return Bcrypt.hashSync(password, Bcrypt.genSaltSync(8));
}

validatePassword = (requestPassword) => Bcrypt.compareSync(requestPassword, this.password);

}
