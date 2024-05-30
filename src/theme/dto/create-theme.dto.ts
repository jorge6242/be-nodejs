import { IsNotEmpty } from "class-validator";

export class CreateThemeDto {
    @IsNotEmpty({ message: "El nombre del tema es obligatorio." })
    name: string;
}