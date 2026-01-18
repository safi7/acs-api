import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategoryEntity, ProductEntity } from 'src/database/entities';
import { writeFile, mkdir, unlink } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

@Injectable()
export class ProductCategoryService {
  private readonly categoriesPath = join(__dirname, '..', '..', '..', 'media', 'products', 'categories');

  constructor(
    @InjectRepository(ProductCategoryEntity)
    private repo: Repository<ProductCategoryEntity>,
    @InjectRepository(ProductEntity)
    private productRepo: Repository<ProductEntity>
  ) {
    // Ensure categories directory exists
    this.ensureCategoriesDirectory();
  }

  private async ensureCategoriesDirectory() {
    if (!existsSync(this.categoriesPath)) {
      await mkdir(this.categoriesPath, { recursive: true });
    }
  }

  findAll() {
    return this.repo.find({
      order: {
        createdAt: 'DESC'
      }
    });
  }

  findOne(slug: string) {
    return this.repo.findOne({ where: { slug } });
  }

  create(productCategory: Partial<ProductCategoryEntity>) {
    const newCategory = this.repo.create(productCategory);
    return this.repo.save(newCategory);
  }

  async createWithFile(
    fileBuffer: Buffer,
    slug: string,
    title: string,
    description: string
  ): Promise<ProductCategoryEntity> {
    // Generate filename based on slug
    const filename = `${slug}.webp`;
    const filePath = join(this.categoriesPath, filename);

    // Save file to disk
    await writeFile(filePath, fileBuffer);

    // Create database record with relative path
    const imageUrl = `media/products/categories/${filename}`;
    const newCategory = this.repo.create({
      title,
      slug,
      description,
      imageUrl
    } as any);

    return this.repo.save(newCategory) as any;
  }

  async delete(slug: string): Promise<void> {
    // Find the category first
    const category = await this.repo.findOne({ where: { slug } });
    if (!category) {
      throw new Error('Category not found');
    }

    // Check if category has products
    const productsCount = await this.productRepo.count({ where: { categorySlug: slug } });
    if (productsCount > 0) {
      throw new Error(`Cannot delete category. It has ${productsCount} product(s) associated with it. Please remove or reassign the products first.`);
    }

    // Delete the image file from disk
    if (category.imageUrl) {
      const filename = category.imageUrl.split('/').pop();
      if (filename) {
        const filePath = join(this.categoriesPath, filename);
        if (existsSync(filePath)) {
          try {
            await unlink(filePath);
          } catch (error) {
            console.error(`Failed to delete category image file ${filePath}:`, error);
            // Continue with DB deletion even if file deletion fails
          }
        }
      }
    }

    // Delete from database
    await this.repo.delete({ slug });
  }
}
