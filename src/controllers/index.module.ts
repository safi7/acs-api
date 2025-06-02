import { Module } from '@nestjs/common';
import { ProductControllerModule } from './product/product.controller.module';

@Module({
  imports: [ProductControllerModule],
})
export class IndexControllerModule {}
