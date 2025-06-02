import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableProductCategory1748678136925 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
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
      }),
      true
    );

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('product-categories');
  }
}


