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
exports.CategoryRepository = void 0;
const typeorm_1 = require("typeorm");
const typedi_1 = require("typedi");
const category_entity_1 = require("./category.entity");
const mongodb_1 = require("mongodb");
let CategoryRepository = class CategoryRepository {
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.repo = this.dataSource.getMongoRepository(category_entity_1.Category);
    }
    async createCategory(name, description) {
        const newRecord = this.repo.create({ name, description });
        return this.repo.save(newRecord);
    }
    async getAll() {
        return await this.repo.find();
    }
    async getCategoryById(id) {
        return await this.repo.findOne({ where: { id: new mongodb_1.ObjectId(id) } });
    }
    async updateCategory(id, name) {
        const category = await this.repo.findOne({ where: { _id: new mongodb_1.ObjectId(id) } });
        if (!category)
            throw new Error("Category not found");
        this.repo.merge(category, { name });
        return await this.repo.save(category);
    }
};
exports.CategoryRepository = CategoryRepository;
exports.CategoryRepository = CategoryRepository = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(() => typeorm_1.DataSource)),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], CategoryRepository);
