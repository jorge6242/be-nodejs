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
exports.ContentController = void 0;
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const content_service_1 = require("./content.service");
const create_content_dto_1 = require("./dto/create-content.dto");
const check_role_middleware_1 = require("../middleware/check-role.middleware");
const update_content_dto_1 = require("./dto/update-content.dto");
let ContentController = class ContentController {
    constructor(service) {
        this.service = service;
    }
    async store(body, response) {
        if (!response.locals.permissions.includes('create')) {
            return response.status(403).json({ message: "Access denied." });
        }
        try {
            const serviceRes = await this.service.createContent(body);
            return response.status(201).json(serviceRes);
        }
        catch (error) {
            console.error("Failed to create :", error);
            return response
                .status(400)
                .json({ message: "Error al crear ", error: error.message });
        }
    }
    async update(id, body, response) {
        if (!response.locals.permissions.includes('update')) {
            return response.status(403).json({ message: "Access denied." });
        }
        try {
            const updatedContent = await this.service.updateContent(id, body);
            return response.status(200).json(updatedContent);
        }
        catch (error) {
            console.error("Failed to update content:", error);
            return response.status(400).json({ message: "Error al actualizar", error: error.message });
        }
    }
    async getById(id, response) {
        try {
            if (!response.locals.permissions.includes('read')) {
                return response.status(403).json({ message: "Access denied." });
            }
            const content = await this.service.getContentById(id);
            return response.status(200).json(content);
        }
        catch (error) {
            console.error("Failed to get content:", error);
            return response.status(400).json({ message: "Error al obtener el contenido", error: error.message });
        }
    }
    async getAll(response) {
        try {
            if (!response.locals.permissions.includes('read')) {
                return response.status(403).json({ message: "Access denied." });
            }
            const res = await this.service.getAll();
            console.log('res ', res);
            return response.status(201).json(res);
        }
        catch (error) {
            console.error("Failed to get contents:", error);
            return response
                .status(400)
                .json({ message: "Error al obtener el contenido", error: error.message });
        }
    }
};
exports.ContentController = ContentController;
__decorate([
    (0, routing_controllers_1.Post)("/"),
    (0, routing_controllers_1.UseBefore)(check_role_middleware_1.CheckRoleMiddleware),
    __param(0, (0, routing_controllers_1.Body)({ validate: true })),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_content_dto_1.CreateContentDto, Object]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "store", null);
__decorate([
    (0, routing_controllers_1.Put)("/:id"),
    (0, routing_controllers_1.UseBefore)(check_role_middleware_1.CheckRoleMiddleware),
    __param(0, (0, routing_controllers_1.Param)("id")),
    __param(1, (0, routing_controllers_1.Body)({ validate: true })),
    __param(2, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_content_dto_1.UpdateContentDto, Object]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "update", null);
__decorate([
    (0, routing_controllers_1.Get)("/:id"),
    (0, routing_controllers_1.UseBefore)(check_role_middleware_1.CheckRoleMiddleware),
    __param(0, (0, routing_controllers_1.Param)("id")),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "getById", null);
__decorate([
    (0, routing_controllers_1.Get)("/"),
    (0, routing_controllers_1.UseBefore)(check_role_middleware_1.CheckRoleMiddleware),
    __param(0, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContentController.prototype, "getAll", null);
exports.ContentController = ContentController = __decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)("/content"),
    __metadata("design:paramtypes", [content_service_1.ContentService])
], ContentController);
