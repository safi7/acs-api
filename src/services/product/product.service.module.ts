import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity, ProductCategoryEntity } from 'src/database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, ProductCategoryEntity])],
  providers: [ProductService],
  exports: [ProductService]
})
export class ProductServiceModule {}
