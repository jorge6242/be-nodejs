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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const contants_1 = require("../utils/contants");
let UserController = class UserController {
    constructor(service) {
        this.service = service;
    }
    async login(body, response) {
        try {
            const user = await this.service.findByEmail(body.email);
            if (!user) {
                throw new routing_controllers_1.UnauthorizedError("User not found");
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id.toString(), email: user.email }, contants_1.SECRET, {
                expiresIn: '48h'
            });
            return response.json({ token, user });
        }
        catch (error) {
            if (error instanceof routing_controllers_1.UnauthorizedError) {
                return response.status(401).json({ message: "User not found" });
            }
            console.error("Login failed:", error);
            return response.status(401).json({ message: "Login failed", error: error.message });
        }
    }
    async createUser(body, response) {
        try {
            const newUser = await this.service.createUser(body);
            if (!newUser) {
                return response.status(400).json({ message: "Alias or email already exists" });
            }
            return response.status(201).json(newUser);
        }
        catch (error) {
            console.error("Failed to create user:", error);
            return response
                .status(400)
                .json({ message: "Error al crear el usuario", error: error.message });
        }
    }
    async updateUser(id, body, response) {
        try {
            const updatedUser = await this.service.updateUser(id, body);
            return response.status(200).json(updatedUser);
        }
        catch (error) {
            console.error("Failed to update user:", error);
            return response
                .status(400)
                .json({
                message: "Error al actualizar el usuario",
                error: error.message,
            });
        }
    }
    async getAll(response, search) {
        try {
            const newUser = await this.service.getAll(search);
            return response.status(201).json(newUser);
        }
        catch (error) {
            console.error("Failed to get user:", error);
            return response
                .status(400)
                .json({ message: "Error al obtener el usuario", error: error.message });
        }
    }
};
exports.UserController = UserController;
__decorate([
    (0, routing_controllers_1.Post)("/login"),
    __param(0, (0, routing_controllers_1.Body)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, routing_controllers_1.Post)("/"),
    __param(0, (0, routing_controllers_1.Body)({ validate: true })),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, routing_controllers_1.Put)("/:id"),
    __param(0, (0, routing_controllers_1.Param)("id")),
    __param(1, (0, routing_controllers_1.Body)({ validate: true })),
    __param(2, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, routing_controllers_1.Get)("/"),
    __param(0, (0, routing_controllers_1.Res)()),
    __param(1, (0, routing_controllers_1.QueryParam)("search")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAll", null);
exports.UserController = UserController = __decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)("/user"),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
