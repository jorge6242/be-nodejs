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
exports.ContentService = void 0;
const typedi_1 = require("typedi");
const content_repository_1 = require("./content.repository");
let ContentService = class ContentService {
    constructor(contentRepository) {
        this.contentRepository = contentRepository;
    }
    async createContent(data) {
        return this.contentRepository.createContent(data);
    }
    async updateContent(id, data) {
        return this.contentRepository.updateContent(id, data);
    }
    async getContentById(id) {
        return this.contentRepository.getContentById(id);
    }
    async getAll() {
        try {
            const aggregation = this.contentRepository.repo.aggregate([
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
                {
                    $lookup: {
                        from: "user",
                        localField: "userId",
                        foreignField: "_id",
                        as: "user",
                    },
                },
                {
                    $unwind: {
                        path: "$theme",
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $unwind: {
                        path: "$category",
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $unwind: {
                        path: "$user",
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $sort: {
                        createdAt: -1,
                        "theme.name": 1,
                        "category.name": 1,
                    },
                },
            ]);
            const results = await aggregation.toArray();
            return results;
        }
        catch (error) {
            console.error("Failed to fetch content", error);
            throw new Error("Error fetching content data");
        }
    }
};
exports.ContentService = ContentService;
exports.ContentService = ContentService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(() => content_repository_1.ContentRepository)),
    __metadata("design:paramtypes", [content_repository_1.ContentRepository])
], ContentService);
