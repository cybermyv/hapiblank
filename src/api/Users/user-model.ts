import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeInsert } from 'typeorm';
import * as Bcrypt from "bcryptjs";

export interface IUser {
    id: number;
    login: string;
    password: string;
    nodelink?: number;
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
}

