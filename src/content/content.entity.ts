import { ObjectId } from 'mongodb';
import { Entity, ObjectIdColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Content {
    @ObjectIdColumn()
    id!: ObjectId;

    @Column()
    name: string = '';

    @Column()
    url: string = '';

    @Column()
    themeId: ObjectId; 

    @Column()
    categoryId: ObjectId;

    @Column()
    userId: ObjectId;

    @CreateDateColumn()
    createdAt: Date = new Date();
}
