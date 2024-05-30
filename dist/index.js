"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const user_controller_1 = require("./user/user.controller");
const database_config_1 = require("./database/database.config");
const category_controller_1 = require("./category/category.controller");
const theme_controller_1 = require("./theme/theme.controller");
const content_controller_1 = require("./content/content.controller");
const role_controller_1 = require("./role/role.controller");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.dataSourceSetup();
    }
    config() {
        this.app.set("port", 8000);
        this.app.use((0, cors_1.default)({ origin: 'http://localhost:3000' }));
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        (0, routing_controllers_1.useContainer)(typedi_1.Container);
    }
    dataSourceSetup() {
        (0, database_config_1.initializeDataSource)()
            .then(() => {
            this.setupControllers();
        })
            .catch((error) => {
            console.error("Failed to setup database connection:", error);
        });
    }
    setupControllers() {
        (0, routing_controllers_1.useExpressServer)(this.app, {
            controllers: [
                user_controller_1.UserController,
                category_controller_1.CategoryController,
                theme_controller_1.ThemeController,
                content_controller_1.ContentController,
                role_controller_1.RoleController
            ],
        });
        this.start();
    }
    start() {
        this.app.listen(this.app.get("port"), () => {
            console.log(`Server listening on port ${this.app.get("port")}`);
        });
    }
}
const server = new Server();
