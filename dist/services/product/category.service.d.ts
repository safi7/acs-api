import { Repository } from 'typeorm';
import { ProductCategoryEntity } from 'src/database/entities';
export declare class ProductCategoryService {
    private repo;
    constructor(repo: Repository<ProductCategoryEntity>);
    findAll(): Promise<ProductCategoryEntity[]>;
    create(productCategory: Partial<ProductCategoryEntity>): Promise<ProductCategoryEntity>;
}
