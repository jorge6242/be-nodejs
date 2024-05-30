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
exports.UserService = void 0;
const typedi_1 = require("typedi");
const user_repository_1 = require("./user.repository");
const typeorm_1 = require("typeorm");
const role_repository_1 = require("../role/role.repository");
let UserService = class UserService {
    constructor(userRepository, roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }
    async createUser(data) {
        return this.userRepository.createUser(data);
    }
    async updateUser(id, data) {
        return this.userRepository.updateUser(id, data);
    }
    async getAll() {
        return this.userRepository.repo.find();
    }
    async findByEmail(email) {
        return this.userRepository.findByEmail(email);
    }
    async hasPermission(userId, permissionNeeded) {
        const user = await this.userRepository.repo.findOne({ where: { _id: new typeorm_1.ObjectId(userId) } });
        if (!user) {
            return false;
        }
        for (let roleId of user.roles) {
            const role = await this.roleRepository.repo.findOne({ where: { _id: new typeorm_1.ObjectId(roleId) } });
            if (role && role.permissions.includes(permissionNeeded)) {
                return true;
            }
        }
        return false;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(() => user_repository_1.UserRepository)),
    __param(1, (0, typedi_1.Inject)(() => role_repository_1.RoleRepository)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        role_repository_1.RoleRepository])
], UserService);
