import { JsonController, Post, Body, Res, UseBefore, Get, Param, Put } from "routing-controllers";
import { Service } from "typedi";
import { Response } from "express";
import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { CheckRoleMiddleware } from '../middleware/check-role.middleware';

@Service()
@JsonController("/category")
export class CategoryController {
  constructor(
    private service: CategoryService,
  ) {}

  @Post("/")
  @UseBefore(CheckRoleMiddleware)
  async store(@Body() body: Category, @Res() response: Response): Promise<Response> {
    if (!response.locals.permissions.includes('create')) {
      return response.status(403).json({ message: "Access denied." });
    }
    try {
      const newUser = await this.service.createCategory(body.name, body.description);
      return response.status(201).json(newUser);
    } catch (error: any) {
      console.error("Failed to create:", error);
      return response.status(400).json({ message: "Error al crear ", error: error.message });
    }
  }

  @Get("/")
  @UseBefore(CheckRoleMiddleware)
  async getAll(@Res() response: Response): Promise<Response> {
    if (!response.locals.permissions.includes('read')) {
      return response.status(403).json({ message: "Access denied." });
    }
    try {
      const categories = await this.service.getAllCategories();
      return response.status(200).json(categories);
    } catch (error: any) {
      console.error("Failed to get categories:", error);
      return response.status(400).json({ message: "Error al obtener las categorías", error: error.message });
    }
  }

  @Get("/:id")
  @UseBefore(CheckRoleMiddleware)
  async getById(@Param("id") id: string, @Res() response: Response): Promise<Response> {
    if (!response.locals.permissions.includes('read')) {
      return response.status(403).json({ message: "Access denied." });
    }
    try {
      const category = await this.service.getCategoryById(id);
      return category ? response.status(200).json(category) : response.status(404).json({ message: "Category not found" });
    } catch (error: any) {
      console.error("Failed to retrieve category:", error);
      return response.status(400).json({ message: "Error al obtener la categoría", error: error.message });
    }
  }

  @Put("/:id")
  @UseBefore(CheckRoleMiddleware)
  async update(@Param("id") id: string, @Body() body: Category, @Res() response: Response): Promise<Response> {
    if (!response.locals.permissions.includes('update')) {
      return response.status(403).json({ message: "Access denied." });
    }
    try {
      const updatedCategory = await this.service.updateCategory(id, body.name);
      return response.status(200).json(updatedCategory);
    } catch (error: any) {
      console.error("Failed to update category:", error);
      return response.status(400).json({ message: "Error al actualizar la categoría", error: error.message });
    }
  }
}
