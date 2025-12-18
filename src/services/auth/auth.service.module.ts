import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrmUserEntity } from 'src/database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([CrmUserEntity])],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthServiceModule {}


