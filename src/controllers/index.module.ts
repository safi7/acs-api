import { Module } from '@nestjs/common';
import { ProductControllerModule } from './product/product.controller.module';
import { ContactControllerModule } from './contact/contact.controller.module';

@Module({
  imports: [ProductControllerModule, ContactControllerModule]
})
export class IndexControllerModule {}
