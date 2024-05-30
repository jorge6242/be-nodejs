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
exports.ThemeRepository = void 0;
// UserRepository.ts
const typeorm_1 = require("typeorm");
const typedi_1 = require("typedi");
const theme_entity_1 = require("./theme.entity");
const mongodb_1 = require("mongodb");
let ThemeRepository = class ThemeRepository {
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.repo = this.dataSource.getMongoRepository(theme_entity_1.Theme);
    }
    async createTheme(name) {
        const existingTheme = await this.repo.findOne({
            where: { name: name }
        });
        if (existingTheme) {
            return null;
        }
        const newTheme = this.repo.create({ name });
        return await this.repo.save(newTheme);
    }
    async findAll() {
        return await this.repo.find();
    }
    async findById(id) {
        return await this.repo.findOneBy({ id: new mongodb_1.ObjectId(id) });
    }
    async updateTheme(id, name) {
        const theme = await this.repo.findOneBy({ id: new mongodb_1.ObjectId(id) });
        if (!theme)
            return null;
        theme.name = name;
        return await this.repo.save(theme);
    }
};
exports.ThemeRepository = ThemeRepository;
exports.ThemeRepository = ThemeRepository = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(() => typeorm_1.DataSource)),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], ThemeRepository);
