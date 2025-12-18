"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableGallery1765892147883 = void 0;
const typeorm_1 = require("typeorm");
class CreateTableGallery1765892147883 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'gallery',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'imagePath',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'description',
                    type: 'text',
                    isNullable: true
                },
                {
                    name: 'title',
                    type: 'varchar',
                    isNullable: true
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
        await queryRunner.dropTable('gallery');
    }
}
exports.CreateTableGallery1765892147883 = CreateTableGallery1765892147883;
//# sourceMappingURL=1765892147883-create-table-gallery.js.map