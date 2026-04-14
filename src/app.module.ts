import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {config as dbConfig} from './configs/typeorm.config';
import {  DataSourceOptions } from 'typeorm';
import { IndexControllerModule } from './controllers/index.module';
import { StorageServiceModule } from './services/storage/storage.service.module';

@Module({
  imports: [StorageServiceModule, IndexControllerModule, TypeOrmModule.forRoot(dbConfig as DataSourceOptions)],
  providers: [],
  controllers: []
})
export class AppModule {}
