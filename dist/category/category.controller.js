"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const category_service_1 = require("./category.service");
const category_entity_1 = require("./category.entity");
const check_role_middleware_1 = require("../middleware/check-role.middleware");
let CategoryController = class CategoryController {
    constructor(service) {
        this.service = service;
    }
    async store(body, response) {
        if (!response.locals.permissions.includes('create')) {
            return response.status(403).json({ message: "Access denied." });
        }
        try {
            const newUser = await this.service.createCategory(body.name, body.description);
            return response.status(201).json(newUser);
        }
        catch (error) {
            console.error("Failed to create:", error);
            return response.status(400).json({ message: "Error al crear ", error: error.message });
        }
    }
    async getAll(response) {
        if (!response.locals.permissions.includes('read')) {
            return response.status(403).json({ message: "Access denied." });
        }
        try {
            const categories = await this.service.getAllCategories();
            return response.status(200).json(categories);
        }
        catch (error) {
            console.error("Failed to get categories:", error);
            return response.status(400).json({ message: "Error al obtener las categorías", error: error.message });
        }
    }
    async getById(id, response) {
        if (!response.locals.permissions.includes('read')) {
            return response.status(403).json({ message: "Access denied." });
        }
        try {
            const category = await this.service.getCategoryById(id);
            return category ? response.status(200).json(category) : response.status(404).json({ message: "Category not found" });
        }
        catch (error) {
            console.error("Failed to retrieve category:", error);
            return response.status(400).json({ message: "Error al obtener la categoría", error: error.message });
        }
    }
    async update(id, body, response) {
        if (!response.locals.permissions.includes('update')) {
            return response.status(403).json({ message: "Access denied." });
        }
        try {
            const updatedCategory = await this.service.updateCategory(id, body.name);
            return response.status(200).json(updatedCategory);
        }
        catch (error) {
            console.error("Failed to update category:", error);
            return response.status(400).json({ message: "Error al actualizar la categoría", error: error.message });
        }
    }
};
exports.CategoryController = CategoryController;
__decorate([
    (0, routing_controllers_1.Post)("/"),
    (0, routing_controllers_1.UseBefore)(check_role_middleware_1.CheckRoleMiddleware),
    __param(0, (0, routing_controllers_1.Body)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_entity_1.Category, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "store", null);
__decorate([
    (0, routing_controllers_1.Get)("/"),
    (0, routing_controllers_1.UseBefore)(check_role_middleware_1.CheckRoleMiddleware),
    __param(0, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getAll", null);
__decorate([
    (0, routing_controllers_1.Get)("/:id"),
    (0, routing_controllers_1.UseBefore)(check_role_middleware_1.CheckRoleMiddleware),
    __param(0, (0, routing_controllers_1.Param)("id")),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getById", null);
__decorate([
    (0, routing_controllers_1.Put)("/:id"),
    (0, routing_controllers_1.UseBefore)(check_role_middleware_1.CheckRoleMiddleware),
    __param(0, (0, routing_controllers_1.Param)("id")),
    __param(1, (0, routing_controllers_1.Body)()),
    __param(2, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, category_entity_1.Category, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "update", null);
exports.CategoryController = CategoryController = __decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)("/category"),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], CategoryController);
