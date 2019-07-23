import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeInsert } from 'typeorm';

export interface IPersona {
    id: number;
    name: string;
    familiid: number;
    linkeduser: number;
    description: string;
}

@Entity('persona')
export default class Persona implements IPersona {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    familiid: number;

    @Column()
    linkeduser: number;

    @Column()
    description: string;

}