import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsServiceModule } from 'src/services/news/news.service.module';
import { GuardsModule } from 'src/common/guards/guards.module';
import { AuthServiceModule } from 'src/services/auth/auth.service.module';

@Module({
  imports: [NewsServiceModule, GuardsModule, AuthServiceModule],
  providers: [],
  controllers: [NewsController]
})
export class NewsControllerModule {}
