import { Module } from '@nestjs/common';
import { ProductControllerModule } from './product/product.controller.module';
import { ContactControllerModule } from './contact/contact.controller.module';
import { GalleryControllerModule } from './gallery/gallery.controller.module';
import { NewsControllerModule } from './news/news.controller.module';
import { AuthControllerModule } from './auth/auth.controller.module';
import { StatsControllerModule } from './stats/stats.controller.module';

@Module({
  imports: [ProductControllerModule, ContactControllerModule, GalleryControllerModule, NewsControllerModule, AuthControllerModule, StatsControllerModule]
})
export class IndexControllerModule {}
