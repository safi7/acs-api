import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {  ProductEntity } from 'src/database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  providers: [ProductService],
  exports: [ProductService]
})
export class ProductServiceModule {}
