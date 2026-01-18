import { Module } from '@nestjs/common';
import { ProductSpecificationService } from './product-specification.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSpecificationEntity, ProductEntity } from 'src/database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([ProductSpecificationEntity, ProductEntity])],
  providers: [ProductSpecificationService],
  exports: [ProductSpecificationService]
})
export class ProductSpecificationServiceModule {}