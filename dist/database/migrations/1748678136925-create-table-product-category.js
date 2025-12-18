"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableProductCategory1748678136925 = void 0;
const typeorm_1 = require("typeorm");
class CreateTableProductCategory1748678136925 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'product-categories',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'slug',
                    type: 'varchar',
                    isNullable: false,
                    isUnique: true
                },
                {
                    name: 'title',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'description',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'imageUrl',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP'
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP'
                }
            ]
        }), true);
    }
    async down(queryRunner) {
        await queryRunner.dropTable('product-categories');
    }
}
exports.CreateTableProductCategory1748678136925 = CreateTableProductCategory1748678136925;
//# sourceMappingURL=1748678136925-create-table-product-category.js.map