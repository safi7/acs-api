import { Module } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GalleryEntity } from 'src/database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([GalleryEntity])],
  providers: [GalleryService],
  exports: [GalleryService]
})
export class GalleryServiceModule {}



