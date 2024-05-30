import { IsNotEmpty } from "class-validator";
import { ObjectId } from 'typeorm';

export class CreateContentDto {
    @IsNotEmpty({ message: "El nombre es obligatorio." })
    name: string;

    @IsNotEmpty({ message: "El tema es obligatorio." })
    themeId: ObjectId;

    @IsNotEmpty({ message: "La categoria es obligatorio." })
    categoryId: ObjectId;

    @IsNotEmpty({ message: "El usuario es obligatorio." })
    userId: ObjectId;
}