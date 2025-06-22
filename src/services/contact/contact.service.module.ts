import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { SendgridProviderModule } from 'src/providers/sendgrid/sendgrid.provider.module';
import { TelegramProviderModule } from 'src/providers/telegram/telegram.provider.module';

@Module({
  imports: [SendgridProviderModule, TelegramProviderModule],
  providers: [ContactService],
  exports: [ContactService]
})
export class ContactServiceModule {}
