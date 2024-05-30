import { JsonController, Post, Body, Res, Get } from "routing-controllers";
import { Service } from "typedi";
import { Response } from "express";
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';

@Service()
@JsonController("/role")
export class RoleController {
  constructor(private service: RoleService) {}

  @Post("/")
  async createRole(
    @Body({ validate: true }) body: CreateRoleDto,
    @Res() response: Response
  ): Promise<Response> {
    try {
      const newRole = await this.service.createRole(body.name, body.permissions);
      if (!newRole) {
        return response.status(400).json({ message: "Role already exists." });
      }
      return response.status(201).json(newRole);
    } catch (error: any) {
      console.error("Failed to create role:", error);
      return response.status(400).json({ message: "Error al crear el rol", error: error.message });
    }
  }

  @Get("/")
  async getAllRoles(@Res() response: Response): Promise<Response> {
    try {
      const roles = await this.service.getAllRoles();
      return response.status(200).json(roles);
    } catch (error: any) {
      console.error("Failed to retrieve roles:", error);
      return response.status(400).json({ message: "Error al obtener los roles", error: error.message });
    }
  }
}
