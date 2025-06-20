import { ProductCategoryEntity, ProductEntity } from '../database/entities';
import mainConfig from './main.config';
import { DataSource, DataSourceOptions } from 'typeorm';

export const config = {
  type: 'postgres',
  host: `${mainConfig.postgres_host}`,
  username: `${mainConfig.postgres_username}`,
  password: `${mainConfig.postgres_password}`,
  database: `${mainConfig.postgres_database}`,
  entities: [ProductCategoryEntity, ProductEntity],
  migrations: ['dist/migrations/*{.ts,.js}'],
  // migrations: ['src/database/migrations/*{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: false
};

if (mainConfig.postgres_port) {
  config['port'] = `${mainConfig.postgres_port}`;
} 

export default new DataSource(config as DataSourceOptions);