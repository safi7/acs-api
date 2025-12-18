import { Module } from '@nestjs/common';
import { StatsController } from './stats.controller';
import { StatsServiceModule } from 'src/services/stats/stats.service.module';
import { GuardsModule } from 'src/common/guards/guards.module';
import { AuthServiceModule } from 'src/services/auth/auth.service.module';

@Module({
  imports: [StatsServiceModule, GuardsModule, AuthServiceModule],
  providers: [],
  controllers: [StatsController]
})
export class StatsControllerModule {}

