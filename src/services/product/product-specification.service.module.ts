import { Module } from '@nestjs/common';
import { ProductSpecificationService } from './product-specification.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSpecificationEntity } from 'src/database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([ProductSpecificationEntity])],
  providers: [ProductSpecificationService],
  exports: [ProductSpecificationService]
})
export class ProductSpecificationServiceModule {}