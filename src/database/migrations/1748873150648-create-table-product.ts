import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateTableProducts1748678136926 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
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
      }),
      true
    );

    await queryRunner.createForeignKey(
      'products',
      new TableForeignKey({
        columnNames: ['categorySlug'],
        referencedTableName: 'product-categories',
        referencedColumnNames: ['slug'],
        onDelete: 'CASCADE'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products');
  }
}
