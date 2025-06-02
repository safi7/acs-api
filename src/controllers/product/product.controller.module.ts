import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductCategoryServiceModule } from 'src/services/product/category.service.module';
import { ProductServiceModule } from 'src/services/product/product.service.module';

@Module({
  imports: [ProductCategoryServiceModule, ProductServiceModule],
  providers: [],
  controllers: [ProductController]
})
export class ProductControllerModule {}
