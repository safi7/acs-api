import { ProductCategoryEntity, ProductEntity, GalleryEntity, CrmUserEntity } from '../database/entities';
import { DataSource } from 'typeorm';
export declare const config: {
    type: string;
    host: string;
    port: string;
    username: string;
    password: string;
    database: string;
    entities: (typeof ProductEntity | typeof ProductCategoryEntity | typeof GalleryEntity | typeof CrmUserEntity)[];
    migrations: string[];
    autoLoadEntities: boolean;
    synchronize: boolean;
};
declare const _default: DataSource;
export default _default;
