import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductCategoryServiceModule } from 'src/services/product/category.service.module';
import { ProductServiceModule } from 'src/services/product/product.service.module';
import { ProductSpecificationServiceModule } from 'src/services/product/product-specification.service.module';
import { AuthServiceModule } from 'src/services/auth/auth.service.module';

@Module({
  imports: [
    ProductCategoryServiceModule,
    ProductServiceModule, 
    ProductSpecificationServiceModule,
    AuthServiceModule
],
  providers: [],
  controllers: [ProductController]
})
export class ProductControllerModule {}
