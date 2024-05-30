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
exports.ThemeController = void 0;
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const theme_service_1 = require("./theme.service");
const create_theme_dto_1 = require("./dto/create-theme.dto");
const check_role_middleware_1 = require("../middleware/check-role.middleware");
let ThemeController = class ThemeController {
    constructor(service) {
        this.service = service;
    }
    async store(body, response) {
        if (!response.locals.permissions.includes('create')) {
            return response.status(403).json({ message: "Access denied." });
        }
        try {
            const serviceRes = await this.service.store(body.name);
            if (!serviceRes) {
                return response.status(400).json({ message: "Theme already exists." });
            }
            return response.status(201).json(serviceRes);
        }
        catch (error) {
            console.error("Failed to create:", error);
            return response
                .status(400)
                .json({ message: "Error al crear ", error: error.message });
        }
    }
    async getAll(response) {
        if (!response.locals.permissions.includes('read')) {
            return response.status(403).json({ message: "Access denied." });
        }
        try {
            const themes = await this.service.getAll();
            return response.status(200).json(themes);
        }
        catch (error) {
            console.error("Failed to retrieve themes:", error);
            return response.status(400).json({ message: "Error al obtener los temas", error: error.message });
        }
    }
    async findById(id, response) {
        if (!response.locals.permissions.includes('read')) {
            return response.status(403).json({ message: "Access denied." });
        }
        try {
            const theme = await this.service.findById(id);
            if (!theme) {
                return response.status(404).json({ message: "Theme not found" });
            }
            return response.status(200).json(theme);
        }
        catch (error) {
            console.error("Failed to get theme:", error);
            return response.status(400).json({ message: "Error al obtener el tema", error: error.message });
        }
    }
    async update(id, body, response) {
        if (!response.locals.permissions.includes('update')) {
            return response.status(403).json({ message: "Access denied." });
        }
        try {
            const updatedTheme = await this.service.update(id, body.name);
            if (!updatedTheme) {
                return response.status(404).json({ message: "Theme not found or no changes made" });
            }
            return response.status(200).json(updatedTheme);
        }
        catch (error) {
            console.error("Failed to update theme:", error);
            return response.status(400).json({ message: "Error al actualizar el tema", error: error.message });
        }
    }
};
exports.ThemeController = ThemeController;
__decorate([
    (0, routing_controllers_1.Post)("/"),
    (0, routing_controllers_1.UseBefore)(check_role_middleware_1.CheckRoleMiddleware),
    __param(0, (0, routing_controllers_1.Body)({ validate: true })),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_theme_dto_1.CreateThemeDto, Object]),
    __metadata("design:returntype", Promise)
], ThemeController.prototype, "store", null);
__decorate([
    (0, routing_controllers_1.Get)("/"),
    (0, routing_controllers_1.UseBefore)(check_role_middleware_1.CheckRoleMiddleware),
    __param(0, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ThemeController.prototype, "getAll", null);
__decorate([
    (0, routing_controllers_1.Get)("/:id"),
    (0, routing_controllers_1.UseBefore)(check_role_middleware_1.CheckRoleMiddleware),
    __param(0, (0, routing_controllers_1.Param)("id")),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ThemeController.prototype, "findById", null);
__decorate([
    (0, routing_controllers_1.Put)("/:id"),
    (0, routing_controllers_1.UseBefore)(check_role_middleware_1.CheckRoleMiddleware),
    __param(0, (0, routing_controllers_1.Param)("id")),
    __param(1, (0, routing_controllers_1.Body)()),
    __param(2, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_theme_dto_1.CreateThemeDto, Object]),
    __metadata("design:returntype", Promise)
], ThemeController.prototype, "update", null);
exports.ThemeController = ThemeController = __decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)("/theme"),
    __metadata("design:paramtypes", [theme_service_1.ThemeService])
], ThemeController);
