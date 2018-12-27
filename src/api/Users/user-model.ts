import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
// import * as Bcrypt from "bcryptjs";

export interface IUser {
    id: number;
    login: string;
    password: string;
    nodelink?: number;
    // validatePassword(requestPassword: string): boolean;
}

@Entity('user')
export default class User implements IUser {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    login: string;

    @Column()
    password: string;

    @Column()
    nodelink: number;

    // validatePassword (requestPassword: string): boolean {
    //     return Bcrypt.compareSync(requestPassword, this.password);
    // }

}

