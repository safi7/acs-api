import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { SendgridProviderModule } from 'src/providers/sendgrid/sendgrid.provider.module';

@Module({
  imports: [SendgridProviderModule],
  providers: [ContactService],
  exports: [ContactService]
})
export class ContactServiceModule {}
