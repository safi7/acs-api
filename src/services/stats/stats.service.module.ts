import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity, ProductCategoryEntity, CrmUserEntity, GalleryEntity } from 'src/database/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      ProductCategoryEntity,
      CrmUserEntity,
      GalleryEntity
    ])
  ],
  providers: [StatsService],
  exports: [StatsService]
})
export class StatsServiceModule {}


