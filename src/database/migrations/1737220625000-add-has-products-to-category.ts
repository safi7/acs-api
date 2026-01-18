import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddHasProductsToCategory1737220625000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'product-categories',
      new TableColumn({
        name: 'hasProducts',
        type: 'boolean',
        default: false,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('product-categories', 'hasProducts');
  }
}
