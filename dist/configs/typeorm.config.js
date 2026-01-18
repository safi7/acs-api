"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const entities_1 = require("../database/entities");
const main_config_1 = require("./main.config");
const typeorm_1 = require("typeorm");
exports.config = {
    type: 'postgres',
    host: `${main_config_1.default.postgres_host}`,
    port: `${main_config_1.default.postgres_port}`,
    username: `${main_config_1.default.postgres_username}`,
    password: `${main_config_1.default.postgres_password}`,
    database: `${main_config_1.default.postgres_database}`,
    entities: [entities_1.ProductCategoryEntity, entities_1.ProductEntity, entities_1.GalleryEntity, entities_1.CrmUserEntity],
    migrations: ['src/database/migrations}'],
    autoLoadEntities: true,
    synchronize: false
};
exports.default = new typeorm_1.DataSource(exports.config);
//# sourceMappingURL=typeorm.config.js.map