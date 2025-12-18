import { Module } from '@nestjs/common';
import { GalleryController } from './gallery.controller';
import { GalleryServiceModule } from 'src/services/gallery/gallery.service.module';
import { GuardsModule } from 'src/common/guards/guards.module';
import { AuthServiceModule } from 'src/services/auth/auth.service.module';

@Module({
  imports: [GalleryServiceModule, GuardsModule, AuthServiceModule],
  providers: [],
  controllers: [GalleryController]
})
export class GalleryControllerModule {}


