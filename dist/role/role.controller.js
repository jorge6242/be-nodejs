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
exports.RoleController = void 0;
// src/role/role.controller.ts
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const role_service_1 = require("./role.service");
const create_role_dto_1 = require("./dto/create-role.dto");
let RoleController = class RoleController {
    constructor(service) {
        this.service = service;
    }
    async createRole(body, response) {
        try {
            const newRole = await this.service.createRole(body.name, body.permissions);
            if (!newRole) {
                return response.status(400).json({ message: "Role already exists." });
            }
            return response.status(201).json(newRole);
        }
        catch (error) {
            console.error("Failed to create role:", error);
            return response.status(400).json({ message: "Error al crear el rol", error: error.message });
        }
    }
    async getAllRoles(response) {
        try {
            const roles = await this.service.getAllRoles();
            return response.status(200).json(roles);
        }
        catch (error) {
            console.error("Failed to retrieve roles:", error);
            return response.status(400).json({ message: "Error al obtener los roles", error: error.message });
        }
    }
};
exports.RoleController = RoleController;
__decorate([
    (0, routing_controllers_1.Post)("/"),
    __param(0, (0, routing_controllers_1.Body)({ validate: true })),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_role_dto_1.CreateRoleDto, Object]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "createRole", null);
__decorate([
    (0, routing_controllers_1.Get)("/"),
    __param(0, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "getAllRoles", null);
exports.RoleController = RoleController = __decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)("/role"),
    __metadata("design:paramtypes", [role_service_1.RoleService])
], RoleController);
