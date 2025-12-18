"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableCrmUsers1765971370828 = void 0;
const typeorm_1 = require("typeorm");
class CreateTableCrmUsers1765971370828 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'crm_users',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'username',
                    type: 'varchar',
                    isNullable: false,
                    isUnique: true
                },
                {
                    name: 'password',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'token',
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
        await queryRunner.dropTable('crm_users');
    }
}
exports.CreateTableCrmUsers1765971370828 = CreateTableCrmUsers1765971370828;
//# sourceMappingURL=1765971370828-create-table-crm-users.js.map