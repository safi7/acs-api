import { Repository } from 'typeorm';
import { ProductCategoryEntity, ProductEntity } from 'src/database/entities';
export declare class ProductCategoryService {
    private repo;
    private productRepo;
    private readonly categoriesPath;
    constructor(repo: Repository<ProductCategoryEntity>, productRepo: Repository<ProductEntity>);
    private ensureCategoriesDirectory;
    findAll(): Promise<ProductCategoryEntity[]>;
    findOne(slug: string): Promise<ProductCategoryEntity | null>;
    create(productCategory: Partial<ProductCategoryEntity>): Promise<ProductCategoryEntity>;
    createWithFile(fileBuffer: Buffer, slug: string, title: string, description: string): Promise<ProductCategoryEntity>;
    delete(slug: string): Promise<void>;
}
