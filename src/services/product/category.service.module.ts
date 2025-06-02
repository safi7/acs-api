import { Module } from '@nestjs/common';
import { ProductCategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategoryEntity } from 'src/database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategoryEntity])],
  providers: [ProductCategoryService],
  exports: [ProductCategoryService]
})
export class ProductCategoryServiceModule {}
