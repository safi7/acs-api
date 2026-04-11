import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateTableNews1765900000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'news',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'slug',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'content',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'keywords',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'imagePath',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'metaDescription',
            type: 'varchar',
            length: '200',
            isNullable: true,
          },
          {
            name: 'isPublished',
            type: 'boolean',
            default: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true
    );

    await queryRunner.createIndex('news', new TableIndex({
      name: 'IDX_news_keywords',
      columnNames: ['keywords'],
    }));

    await queryRunner.createIndex('news', new TableIndex({
      name: 'IDX_news_slug',
      columnNames: ['slug'],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('news', 'IDX_news_keywords');
    await queryRunner.dropIndex('news', 'IDX_news_slug');
    await queryRunner.dropTable('news');
  }
}
