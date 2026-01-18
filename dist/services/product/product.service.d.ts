import { Repository } from 'typeorm';
import { ProductEntity, ProductCategoryEntity } from 'src/database/entities';
export declare class ProductService {
    private repo;
    private categoryRepo;
    private readonly productsPath;
    constructor(repo: Repository<ProductEntity>, categoryRepo: Repository<ProductCategoryEntity>);
    private ensureProductsDirectory;
    findAll(): Promise<ProductEntity[]>;
    findOne(slug: string): Promise<ProductEntity | null>;
    create(productCategory: Partial<ProductEntity>): Promise<ProductEntity>;
    createWithFile(fileBuffer: Buffer, slug: string, productData: Partial<ProductEntity>): Promise<ProductEntity>;
    delete(slug: string): Promise<void>;
    private updateCategoryHasProducts;
}
