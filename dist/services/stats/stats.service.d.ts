import { Repository } from 'typeorm';
import { ProductEntity, ProductCategoryEntity, CrmUserEntity, GalleryEntity } from 'src/database/entities';
export declare class StatsService {
    private productRepo;
    private categoryRepo;
    private userRepo;
    private galleryRepo;
    constructor(productRepo: Repository<ProductEntity>, categoryRepo: Repository<ProductCategoryEntity>, userRepo: Repository<CrmUserEntity>, galleryRepo: Repository<GalleryEntity>);
    getCRMStats(): Promise<{
        totalProducts: number;
        totalCategories: number;
        totalUsers: number;
        totalGalleryImages: number;
    }>;
}
