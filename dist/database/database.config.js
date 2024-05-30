"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDataSource = void 0;
const typeorm_1 = require("typeorm");
const typedi_1 = require("typedi");
const user_entity_1 = require("../user/user.entity");
const category_entity_1 = require("../category/category.entity");
const theme_entity_1 = require("../theme/theme.entity");
const content_entity_1 = require("../content/content.entity");
const role_entity_1 = require("../role/role.entity");
const initializeDataSource = () => {
    const dataSource = new typeorm_1.DataSource({
        type: "mongodb",
        url: "mongodb://localhost:27017",
        database: "nodejs",
        entities: [user_entity_1.User, category_entity_1.Category, theme_entity_1.Theme, content_entity_1.Content, role_entity_1.Role],
        synchronize: true,
        logging: true,
    });
    return dataSource
        .initialize()
        .then(() => {
        typedi_1.Container.set(typeorm_1.DataSource, dataSource);
        console.log("Conexión a la base de datos establecida con éxito");
        return dataSource;
    })
        .catch((error) => {
        console.error("Error al conectar con la base de datos:", error);
        throw error;
    });
};
exports.initializeDataSource = initializeDataSource;
