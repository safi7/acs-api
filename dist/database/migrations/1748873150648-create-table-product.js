"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableProducts1748678136926 = void 0;
const typeorm_1 = require("typeorm");
class CreateTableProducts1748678136926 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'products',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'slug',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'type',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'keyWords',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'composition',
                    type: 'text',
                    isNullable: true
                },
                {
                    name: 'coating',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'colour',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'tissueReaction',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'absorption',
                    type: 'text',
                    isNullable: true
                },
                {
                    name: 'presentation',
                    type: 'text',
                    isNullable: true
                },
                {
                    name: 'needleTypeUrl',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'completeSheet',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'indications',
                    type: 'text',
                    isNullable: true
                },
                {
                    name: 'benefits',
                    type: 'text',
                    isNullable: true
                },
                {
                    name: 'orderNumber',
                    type: 'text',
                    isNullable: true
                },
                {
                    name: 'categorySlug',
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
        await queryRunner.createForeignKey('products', new typeorm_1.TableForeignKey({
            columnNames: ['categorySlug'],
            referencedTableName: 'product-categories',
            referencedColumnNames: ['slug'],
            onDelete: 'CASCADE'
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('products');
    }
}
exports.CreateTableProducts1748678136926 = CreateTableProducts1748678136926;
//# sourceMappingURL=1748873150648-create-table-product.js.map