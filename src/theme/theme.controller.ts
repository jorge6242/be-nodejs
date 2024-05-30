import { JsonController, Post, Body, Res, Get, Param, Put, UseBefore } from "routing-controllers";
import { Service } from "typedi";
import { Response } from "express";
import { ThemeService } from './theme.service';
import { CreateThemeDto } from './dto/create-theme.dto';
import { CheckRoleMiddleware } from '../middleware/check-role.middleware';

@Service()
@JsonController("/theme")
export class ThemeController {
  constructor(private service: ThemeService) {}

  @Post("/")
  @UseBefore(CheckRoleMiddleware)
  async store(
    @Body({ validate: true }) body: CreateThemeDto,
    @Res() response: Response
  ): Promise<Response> {
    if (!response.locals.permissions.includes('create')) {
      return response.status(403).json({ message: "Access denied." });
    }
    try {
      const serviceRes = await this.service.store(body.name);
      if (!serviceRes) {
        return response.status(400).json({ message: "Theme already exists." });
      }
      return response.status(201).json(serviceRes);
    } catch (error: any) {
      console.error("Failed to create:", error);
      return response
        .status(400)
        .json({ message: "Error al crear ", error: error.message });
    }
  }

  @Get("/")
  @UseBefore(CheckRoleMiddleware)
  async getAll(@Res() response: Response): Promise<Response> {
    if (!response.locals.permissions.includes('read')) {
      return response.status(403).json({ message: "Access denied." });
    }
    try {
      const themes = await this.service.getAll();
      return response.status(200).json(themes);
    } catch (error: any) {
      console.error("Failed to retrieve themes:", error);
      return response.status(400).json({ message: "Error al obtener los temas", error: error.message });
    }
  }

  @Get("/:id")
  @UseBefore(CheckRoleMiddleware)
  async findById(@Param("id") id: string, @Res() response: Response): Promise<Response> {
    if (!response.locals.permissions.includes('read')) {
      return response.status(403).json({ message: "Access denied." });
    }
    try {
      const theme = await this.service.findById(id);
      if (!theme) {
        return response.status(404).json({ message: "Theme not found" });
      }
      return response.status(200).json(theme);
    } catch (error: any) {
      console.error("Failed to get theme:", error);
      return response.status(400).json({ message: "Error al obtener el tema", error: error.message });
    }
  }

  @Put("/:id")
  @UseBefore(CheckRoleMiddleware)
  async update(@Param("id") id: string, @Body() body: CreateThemeDto, @Res() response: Response): Promise<Response> {
    if (!response.locals.permissions.includes('update')) {
      return response.status(403).json({ message: "Access denied." });
    }
    try {
      const updatedTheme = await this.service.update(id, body.name);
      if (!updatedTheme) {
        return response.status(404).json({ message: "Theme not found or no changes made" });
      }
      return response.status(200).json(updatedTheme);
    } catch (error: any) {
      console.error("Failed to update theme:", error);
      return response.status(400).json({ message: "Error al actualizar el tema", error: error.message });
    }
  }
}
