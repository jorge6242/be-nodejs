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
exports.CheckRoleMiddleware = void 0;
const typedi_1 = require("typedi");
const routing_controllers_1 = require("routing-controllers");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_service_1 = require("../user/user.service");
const contants_1 = require("../utils/contants");
let CheckRoleMiddleware = class CheckRoleMiddleware {
    constructor(userService) {
        this.userService = userService;
    }
    async use(request, response, next) {
        if (request.path === "/user/login" || request.path.startsWith("/user/login")) {
            return next();
        }
        const token = request.headers.authorization?.split(" ")[1];
        if (!token) {
            return next(new routing_controllers_1.HttpError(401, "No token provided"));
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, contants_1.SECRET);
            const user = await this.userService.findByEmail(decoded.email);
            console.log('user.roles ', user.roles);
            if (!user) {
                return next(new routing_controllers_1.HttpError(404, "User not found"));
            }
            const permissionList = user.roles.reduce((acc, role) => {
                if (role.permissions) {
                    return [...acc, ...role.permissions];
                }
                return acc;
            }, []);
            response.locals.permissions = permissionList;
            response.locals.user = user;
            response.locals.jwtPayload = decoded;
            next();
        }
        catch (error) {
            return next(new routing_controllers_1.HttpError(401, "Invalid token or token expired"));
        }
    }
};
exports.CheckRoleMiddleware = CheckRoleMiddleware;
exports.CheckRoleMiddleware = CheckRoleMiddleware = __decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.Middleware)({ type: "before" }),
    __metadata("design:paramtypes", [user_service_1.UserService])
], CheckRoleMiddleware);
