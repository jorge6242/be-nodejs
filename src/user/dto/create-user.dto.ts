import { IsArray, IsNotEmpty } from "class-validator";
import { ObjectId } from 'typeorm';

export class CreateUserDto {
    @IsNotEmpty({ message: "El alias es obligatorio." })
    alias: string;

    @IsNotEmpty({ message: "El correo es obligatorio." })
    email: string;

    @IsArray()
    @IsNotEmpty({ message: "El rol es obligatorio." })
    roles: ObjectId[];
}