import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity, ProductCategoryEntity } from 'src/database/entities';
import { writeFile, mkdir, unlink } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

@Injectable()
export class ProductService {
  private readonly productsPath = join(__dirname, '..', '..', '..', 'media', 'products');

  constructor(
    @InjectRepository(ProductEntity)
    private repo: Repository<ProductEntity>,
    @InjectRepository(ProductCategoryEntity)
    private categoryRepo: Repository<ProductCategoryEntity>
  ) {
    // Ensure products directory exists
    this.ensureProductsDirectory();
  }

  private async ensureProductsDirectory() {
    if (!existsSync(this.productsPath)) {
      await mkdir(this.productsPath, { recursive: true });
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

  create(productCategory: Partial<ProductEntity>) {
    const newCategory = this.repo.create(productCategory);
    return this.repo.save(newCategory);
  }

  async createWithFile(
    fileBuffer: Buffer,
    slug: string,
    productData: Partial<ProductEntity>
  ): Promise<ProductEntity> {
    // Generate filename based on slug
    const filename = `${slug}.webp`;
    const filePath = join(this.productsPath, filename);

    // Save file to disk
    await writeFile(filePath, fileBuffer);

    // Create database record with relative path
    const imageUrl = `media/products/${filename}`;
    const newProduct = this.repo.create({
      ...productData,
      imageUrl
    } as any);

    const savedProduct = await this.repo.save(newProduct) as any;

    // Update category hasProducts to true
    await this.updateCategoryHasProducts(savedProduct.categorySlug);

    return savedProduct;
  }

  async delete(slug: string): Promise<void> {
    // Find the product first
    const product = await this.repo.findOne({ where: { slug } });
    if (!product) {
      throw new Error('Product not found');
    }

    const categorySlug = product.categorySlug;

    // Delete the image file from disk
    if (product.imageUrl) {
      const filename = product.imageUrl.split('/').pop();
      if (filename) {
        const filePath = join(this.productsPath, filename);
        if (existsSync(filePath)) {
          try {
            await unlink(filePath);
          } catch (error) {
            console.error(`Failed to delete product image file ${filePath}:`, error);
            // Continue with DB deletion even if file deletion fails
          }
        }
      }
    }

    // Delete from database
    await this.repo.delete({ slug });

    // Check if category still has products and update hasProducts
    await this.updateCategoryHasProducts(categorySlug);
  }

  private async updateCategoryHasProducts(categorySlug: string): Promise<void> {
    const productsCount = await this.repo.count({ where: { categorySlug } });
    const category = await this.categoryRepo.findOne({ where: { slug: categorySlug } });
    
    if (category) {
      const shouldHaveProducts = productsCount > 0;
      if (category.hasProducts !== shouldHaveProducts) {
        await this.categoryRepo.update(
          { slug: categorySlug },
          { hasProducts: shouldHaveProducts }
        );
      }
    }
  }
}
