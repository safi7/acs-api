import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddSpecificationsToProducts1748873150650 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Check if specifications column exists
    const table = await queryRunner.getTable('products');
    const specificationsColumn = table?.findColumnByName('specifications');
    
    if (!specificationsColumn) {
      // Add specifications column
      await queryRunner.addColumn(
        'products',
        new TableColumn({
          name: 'specifications',
          type: 'json',
          isNullable: true
        })
      );
    }

    // Migrate existing data to specifications JSON
    const products = await queryRunner.query('SELECT * FROM products');
    
    for (const product of products) {
      const specifications: any = {};
      
      // Map existing fields to specifications (only if they exist)
      if (product.type !== undefined) specifications.type = product.type;
      if (product.keyWords !== undefined) specifications.key_words = product.keyWords;
      if (product.composition !== undefined) specifications.composition = product.composition;
      if (product.coating !== undefined) specifications.coating = product.coating;
      if (product.colour !== undefined) specifications.colour = product.colour;
      if (product.tissueReaction !== undefined) specifications.tissue_reaction = product.tissueReaction;
      if (product.absorption !== undefined) specifications.absorption = product.absorption;
      if (product.presentation !== undefined) specifications.presentation = product.presentation;
      if (product.needleTypeUrl !== undefined) specifications.needle_type_url = product.needleTypeUrl;
      if (product.completeSheet !== undefined) specifications.complete_sheet = product.completeSheet;
      if (product.indications !== undefined) specifications.indications = product.indications;
      if (product.benefits !== undefined) specifications.benefits = product.benefits;
      if (product.orderNumber !== undefined) specifications.order_number = product.orderNumber;

      // Update product with specifications JSON only if we have data to migrate
      if (Object.keys(specifications).length > 0) {
        await queryRunner.query(
          'UPDATE products SET specifications = $1 WHERE id = $2',
          [JSON.stringify(specifications), product.id]
        );
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('products');
    const specificationsColumn = table?.findColumnByName('specifications');
    
    if (specificationsColumn) {
      await queryRunner.dropColumn('products', 'specifications');
    }
  }
}