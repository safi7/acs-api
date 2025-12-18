import { ProductCategoryEntity, ProductEntity, GalleryEntity, CrmUserEntity } from '../database/entities';
import mainConfig from './main.config';
import { DataSource, DataSourceOptions } from 'typeorm';

export const config = {
  type: 'postgres',
  host: `${mainConfig.postgres_host}`,
  port: `${mainConfig.postgres_port}`,
  username: `${mainConfig.postgres_username}`,
  password: `${mainConfig.postgres_password}`,
  database: `${mainConfig.postgres_database}`,
  entities: [ProductCategoryEntity, ProductEntity, GalleryEntity, CrmUserEntity],
  migrations: ['dist/migrations/*{.ts,.js}'],
  // migrations: ['src/database/migrations/*{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: false
};


export default new DataSource(config as DataSourceOptions);