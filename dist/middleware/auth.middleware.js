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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
// src/middleware/authMiddleware.ts
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_service_1 = require("../user/user.service");
const contants_1 = require("../utils/contants");
let AuthMiddleware = class AuthMiddleware {
    constructor(userService) {
        this.userService = userService;
    }
    async use(req, res, next) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader)
                throw new Error("No token provided");
            const token = authHeader.split(" ")[1];
            const decoded = jsonwebtoken_1.default.verify(token, contants_1.SECRET);
            const hasPermission = await this.userService.hasPermission(decoded.id, "required_permission");
            if (!hasPermission) {
                return res.status(403).json({ message: "Insufficient permissions" });
            }
            next();
        }
        catch (error) {
            res.status(401).json({ message: "Unauthorized: " + error.message });
        }
    }
};
exports.AuthMiddleware = AuthMiddleware;
exports.AuthMiddleware = AuthMiddleware = __decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.Middleware)({ type: "before" }),
    __metadata("design:paramtypes", [user_service_1.UserService])
], AuthMiddleware);
