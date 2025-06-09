import { Module } from '@nestjs/common';
import { SendgridProvider } from './sendgrid.provider';

@Module({
  imports: [],
  providers: [SendgridProvider],
  exports: [SendgridProvider]
})
export class SendgridProviderModule {}
