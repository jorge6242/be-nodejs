import { ObjectId } from 'mongodb';
import { Service } from 'typedi';
import { Entity, ObjectIdColumn, Column } from 'typeorm';

@Entity()
@Service()
export class Category {
    @ObjectIdColumn()
    id!: ObjectId;

    @Column({ nullable: true })
    name: string = '';

    @Column({ nullable: true })
    description: string = '';
}
