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
            name: 'shortDescription',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'fullDescription',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'manufacturer',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'certifications',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'specifications',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'imageUrl',
            type: 'varchar',
            isNullable: false
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
