import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthServiceModule } from 'src/services/auth/auth.service.module';
import { GuardsModule } from 'src/common/guards/guards.module';

@Module({
  imports: [AuthServiceModule, GuardsModule],
  providers: [],
  controllers: [AuthController]
})
export class AuthControllerModule {}

