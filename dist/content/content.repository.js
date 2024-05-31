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
exports.ContentRepository = void 0;
const typeorm_1 = require("typeorm");
const typedi_1 = require("typedi");
const content_entity_1 = require("./content.entity");
const mongodb_1 = require("mongodb");
let ContentRepository = class ContentRepository {
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.repo = this.dataSource.getMongoRepository(content_entity_1.Content);
    }
    async createContent(data) {
        const { name, themeId, categoryId, userId } = data;
        const newUser = this.repo.create({
            name,
            themeId: new mongodb_1.ObjectId(themeId),
            categoryId: new mongodb_1.ObjectId(categoryId),
            userId: new mongodb_1.ObjectId(userId),
        });
        return await this.repo.save(newUser);
    }
    async updateContent(id, data) {
        const { name, userId, themeId, categoryId } = data;
        const content = await this.repo.findOne({
            where: { _id: new mongodb_1.ObjectId(id) },
        });
        if (!content) {
            throw new Error("Content not found");
        }
        this.repo.merge(content, {
            name,
            userId: new mongodb_1.ObjectId(userId),
            themeId: new mongodb_1.ObjectId(themeId),
            categoryId: new mongodb_1.ObjectId(categoryId),
        });
        return await this.repo.save(content);
    }
    async getContentById(id) {
        const content = await this.repo.findOne({
            where: { _id: new mongodb_1.ObjectId(id) },
        });
        if (!content) {
            throw new Error("Content not found");
        }
        return content;
    }
    async getAll(search) {
        let query = {};
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { "theme.name": { $regex: search, $options: "i" } },
                { "category.name": { $regex: search, $options: "i" } },
            ];
        }
        return await this.repo
            .aggregate([
            {
                $lookup: {
                    from: "theme",
                    localField: "themeId",
                    foreignField: "_id",
                    as: "theme",
                },
            },
            {
                $lookup: {
                    from: "category",
                    localField: "categoryId",
                    foreignField: "_id",
                    as: "category",
                },
            },
            { $unwind: "$theme" },
            { $unwind: "$category" },
            { $match: query },
            { $sort: { createdAt: -1 } },
        ])
            .toArray();
    }
};
exports.ContentRepository = ContentRepository;
exports.ContentRepository = ContentRepository = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(() => typeorm_1.DataSource)),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], ContentRepository);
