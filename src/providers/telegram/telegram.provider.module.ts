import { Module } from '@nestjs/common';
import { TelegramProvider } from './telegram.provider';

@Module({
  imports: [],
  providers: [TelegramProvider],
  exports: [TelegramProvider]
})
export class TelegramProviderModule {}
