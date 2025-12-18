import { Repository } from 'typeorm';
import { ProductEntity } from 'src/database/entities';
export declare class ProductService {
    private repo;
    constructor(repo: Repository<ProductEntity>);
    findAll(): Promise<ProductEntity[]>;
    findOne(slug: string): Promise<ProductEntity | null>;
    create(productCategory: Partial<ProductEntity>): Promise<ProductEntity>;
}
