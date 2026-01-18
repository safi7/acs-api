import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropOldProductColumns1748873150651 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Get current table structure
    const table = await queryRunner.getTable('products');
    if (!table) return;

    // Drop old individual specification columns if they exist (but keep slug, name, categorySlug)
    const columnsToRemove = [
      'composition',
      'coating',
      'colour',
      'tissueReaction',
      'absorption',
      'presentation',
      'needleTypeUrl',
      'completeSheet',
      'indications',
      'benefits',
      'orderNumber'
    ];

    for (const columnName of columnsToRemove) {
      const column = table.findColumnByName(columnName);
      if (column) {
        await queryRunner.dropColumn('products', columnName);
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Recreate columns if needed for rollback
    const columns = [
      { name: 'composition', type: 'text', isNullable: true },
      { name: 'coating', type: 'varchar', isNullable: true },
      { name: 'colour', type: 'varchar', isNullable: true },
      { name: 'tissueReaction', type: 'varchar', isNullable: true },
      { name: 'absorption', type: 'text', isNullable: true },
      { name: 'presentation', type: 'text', isNullable: true },
      { name: 'needleTypeUrl', type: 'varchar', isNullable: true },
      { name: 'completeSheet', type: 'varchar', isNullable: true },
      { name: 'indications', type: 'text', isNullable: true },
      { name: 'benefits', type: 'text', isNullable: true },
      { name: 'orderNumber', type: 'text', isNullable: true }
    ];

    for (const column of columns) {
      await queryRunner.addColumn('products', {
        name: column.name,
        type: column.type,
        isNullable: column.isNullable ? true: false,
      } as any);
    }
  }
}