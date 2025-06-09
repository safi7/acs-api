import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactServiceModule } from 'src/services/contact/contact.service.module';

@Module({
  imports: [ContactServiceModule],
  providers: [],
  controllers: [ContactController]
})
export class ContactControllerModule {}
