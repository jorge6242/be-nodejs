import { ObjectId } from 'mongodb';
import { Service } from 'typedi';
import { Entity, ObjectIdColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
@Service()
export class User {
    @ObjectIdColumn()
    id!: ObjectId;

    @Column()
    alias: string = '';

    @Column()
    email: string = '';;

    @Column()
    roles: ObjectId[];

    @CreateDateColumn()
    createdAt: Date = new Date();
}
