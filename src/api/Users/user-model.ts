// export interface IUser {
//     id: number;
//     login: string;
//     password: string;
//     nodelink: number;
// }

// let _UserModel: any = {};

// export const UserModel: IUser = _UserModel;

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export interface IUser {
    id: number;
    login: string;
    password: string;
    nodelink?: number;

}

@Entity()
export default class User implements IUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    login: string;

    @Column()
    password: string;

    @Column()
    nodelink: number;
}