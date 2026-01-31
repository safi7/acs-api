import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { TelegramProviderModule } from 'src/providers/telegram/telegram.provider.module';

@Module({
  imports: [TelegramProviderModule],
  providers: [ContactService],
  exports: [ContactService]
})
export class ContactServiceModule {}
