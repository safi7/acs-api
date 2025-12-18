import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity, ProductCategoryEntity, CrmUserEntity, GalleryEntity } from 'src/database/entities';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepo: Repository<ProductEntity>,
    @InjectRepository(ProductCategoryEntity)
    private categoryRepo: Repository<ProductCategoryEntity>,
    @InjectRepository(CrmUserEntity)
    private userRepo: Repository<CrmUserEntity>,
    @InjectRepository(GalleryEntity)
    private galleryRepo: Repository<GalleryEntity>
  ) {}

  async getCRMStats() {
    // Fetch all stats in parallel for better performance
    const [totalProducts, totalCategories, totalUsers, totalGalleryImages] = await Promise.all([
      this.productRepo.count(),
      this.categoryRepo.count(),
      this.userRepo.count(),
      this.galleryRepo.count()
    ]);

    return {
      totalProducts,
      totalCategories,
      totalUsers,
      totalGalleryImages
    };
  }
}


