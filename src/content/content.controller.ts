import { JsonController, Post, Body, Res, Get, UseBefore, Put, Param, QueryParam } from "routing-controllers";
import { Service } from "typedi";
import { Response } from "express";
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { CheckRoleMiddleware } from '../middleware/check-role.middleware';
import { UpdateContentDto } from './dto/update-content.dto';

@Service()
@JsonController("/content")
export class ContentController {
  constructor(private service: ContentService) {}

  @Post("/")
  @UseBefore(CheckRoleMiddleware)
  async store(
    @Body({ validate: true }) body: CreateContentDto,
    @Res() response: Response
  ): Promise<Response> {
    if (!response.locals.permissions.includes('create')) {
      return response.status(403).json({ message: "Access denied." });
    }
    try {
      const serviceRes = await this.service.createContent(body);
      return response.status(201).json(serviceRes);
    } catch (error: any) {
      console.error("Failed to create :", error);
      return response
        .status(400)
        .json({ message: "Error al crear ", error: error.message });
    }
  }

  @Put("/:id")
  @UseBefore(CheckRoleMiddleware)
  async update(
    @Param("id") id: string,
    @Body({ validate: true }) body: UpdateContentDto,
    @Res() response: Response
  ): Promise<Response> {
    if (!response.locals.permissions.includes('update')) {
      return response.status(403).json({ message: "Access denied." });
    }
    try {
      const updatedContent = await this.service.updateContent(id, body);
      return response.status(200).json(updatedContent);
    } catch (error: any) {
      console.error("Failed to update content:", error);
      return response.status(400).json({ message: "Error al actualizar", error: error.message });
    }
  }

  @Get("/:id")
  @UseBefore(CheckRoleMiddleware)
  async getById(
    @Param("id") id: string,
    @Res() response: Response
  ): Promise<Response> {
    try {
      if (!response.locals.permissions.includes('read')) {
        return response.status(403).json({ message: "Access denied." });
      }
      const content = await this.service.getContentById(id);
      return response.status(200).json(content);
    } catch (error: any) {
      console.error("Failed to get content:", error);
      return response.status(400).json({ message: "Error al obtener el contenido", error: error.message });
    }
  }

  @Get("/")
  @UseBefore(CheckRoleMiddleware)
  async getAll(@Res() response: Response, @QueryParam("search") search?: string): Promise<Response> {
    try {
      if (!response.locals.permissions.includes('read')) {
        return response.status(403).json({ message: "Access denied." });
      }
      const res = await this.service.getAll(search);
      return response.status(201).json(res);
    } catch (error: any) {
      console.error("Failed to get contents:", error);
      return response
        .status(400)
        .json({ message: "Error al obtener el contenido", error: error.message });
    }
  }
}
