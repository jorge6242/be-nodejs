import { ObjectId } from "mongodb";
import { Entity, ObjectIdColumn, Column } from "typeorm";

export enum Permission {
    CREATE = 'create',
    READ = 'read',
    UPDATE = 'update',
    DELETE = 'delete'
  }

@Entity()
export class Role {
    @ObjectIdColumn()
    id!: ObjectId;

    @Column()
    name: string;

    @Column("simple-array")
    permissions: Permission[];
}
