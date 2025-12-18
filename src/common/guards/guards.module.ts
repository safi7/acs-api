import { Module } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthServiceModule } from 'src/services/auth/auth.service.module';

@Module({
  imports: [AuthServiceModule],
  providers: [AuthGuard],
  exports: [AuthGuard]
})
export class GuardsModule {}


