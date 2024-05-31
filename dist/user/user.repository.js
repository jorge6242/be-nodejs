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
exports.UserRepository = void 0;
const typeorm_1 = require("typeorm");
const typedi_1 = require("typedi");
const user_entity_1 = require("./user.entity");
const mongodb_1 = require("mongodb");
const role_entity_1 = require("../role/role.entity");
let UserRepository = class UserRepository {
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.repo = this.dataSource.getMongoRepository(user_entity_1.User);
        this.roleRepo = this.dataSource.getMongoRepository(role_entity_1.Role);
    }
    async findAllUsers(search) {
        if (search) {
            return this.repo.find({
                where: {
                    $or: [
                        { alias: new RegExp(search, 'i') },
                        { email: new RegExp(search, 'i') }
                    ]
                }
            });
        }
        return this.repo.find();
    }
    async createUser(data) {
        const { alias, email, roles } = data;
        const existAlias = await this.repo.findOne({ where: { alias } });
        const existEmail = await this.repo.findOne({ where: { email } });
        if (existAlias || existEmail) {
            return null;
        }
        const newUser = this.repo.create({ alias, email, roles });
        return await this.repo.save(newUser);
    }
    async updateUser(id, data) {
        const { alias, email, roles } = data;
        const objectId = new mongodb_1.ObjectId(id);
        let user = await this.repo.findOne({ where: { _id: objectId } });
        if (!user) {
            throw new Error("User not found");
        }
        user = this.repo.merge(user, { alias, email, roles });
        return await this.repo.save(user);
    }
    async findByEmail(email) {
        const user = await this.repo.findOne({ where: { email } });
        if (!user) {
            return null;
        }
        if (user?.roles && user.roles.length > 0) {
            const roleIds = user.roles.map((id) => new mongodb_1.ObjectId(id));
            const roles = await this.roleRepo.find({
                where: {
                    _id: { $in: roleIds }
                }
            });
            user.roles = roles;
        }
        return user;
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(() => typeorm_1.DataSource)),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], UserRepository);
