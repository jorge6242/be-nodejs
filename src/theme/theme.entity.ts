import { Service } from 'typedi';
import { Entity, ObjectIdColumn, Column, Unique } from 'typeorm';

@Entity()
@Service()
export class Theme {
    @ObjectIdColumn()
    id!: string;

    @Column({ nullable: true, unique: true })
    name: string = '';
}
