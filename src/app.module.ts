import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {config as dbConfig} from './configs/typeorm.config';
import {  DataSourceOptions } from 'typeorm';
import { IndexControllerModule } from './controllers/index.module';

@Module({
  imports: [IndexControllerModule, TypeOrmModule.forRoot(dbConfig as DataSourceOptions)],
  providers: [],
  controllers: []
})
export class AppModule {}
