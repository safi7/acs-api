import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableGallery1765892147883 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
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
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('gallery');
  }
}



