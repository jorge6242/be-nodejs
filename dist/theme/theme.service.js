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
exports.ThemeService = void 0;
const typedi_1 = require("typedi");
const theme_repository_1 = require("./theme.repository");
let ThemeService = class ThemeService {
    constructor(repo) {
        this.repo = repo;
    }
    async store(name) {
        return this.repo.createTheme(name);
    }
    async getAll() {
        return this.repo.findAll();
    }
    async findById(id) {
        return this.repo.findById(id);
    }
    async update(id, name) {
        return this.repo.updateTheme(id, name);
    }
};
exports.ThemeService = ThemeService;
exports.ThemeService = ThemeService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(() => theme_repository_1.ThemeRepository)),
    __metadata("design:paramtypes", [theme_repository_1.ThemeRepository])
], ThemeService);
