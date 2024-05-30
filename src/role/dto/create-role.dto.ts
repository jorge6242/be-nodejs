import { IsString, IsArray, ArrayNotEmpty, IsEnum } from "class-validator";
import { Permission } from "../role.entity";

export class CreateRoleDto {
  @IsString()
  name: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(Permission, { each: true })
  permissions: Permission[];
}
