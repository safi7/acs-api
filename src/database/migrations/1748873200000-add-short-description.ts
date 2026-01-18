import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddShortDescription1748873200000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('products');
    if (!table) return;

    // Add missing columns if they don't exist
    const columnsToAdd = [
      { name: 'manufacturer', type: 'varchar', isNullable: true },
      { name: 'certifications', type: 'varchar', isNullable: true },
      { name: 'imageUrl', type: 'varchar', isNullable: true },
    ];

    for (const columnDef of columnsToAdd) {
      const existingColumn = table.findColumnByName(columnDef.name);
      if (!existingColumn) {
        await queryRunner.addColumn(
          'products',
          new TableColumn({
            name: columnDef.name,
            type: columnDef.type,
            isNullable: columnDef.isNullable,
          }),
        );
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('products');
    if (!table) return;

    const columnsToRemove = ['manufacturer', 'certifications', 'imageUrl'];
    
    for (const columnName of columnsToRemove) {
      const column = table.findColumnByName(columnName);
      if (column) {
        await queryRunner.dropColumn('products', columnName);
      }
    }
  }
}
