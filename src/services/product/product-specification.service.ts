import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSpecificationEntity, ProductEntity } from 'src/database/entities';
import { FieldKeyUtil } from 'src/common/utils/field-key.util';

@Injectable()
export class ProductSpecificationService {
  constructor(
    @InjectRepository(ProductSpecificationEntity)
    private repo: Repository<ProductSpecificationEntity>,
    @InjectRepository(ProductEntity)
    private productRepo: Repository<ProductEntity>
  ) {}

  findAll() {
    return this.repo.find({ 
      where: { isActive: true },
      order: { sortOrder: 'ASC', name: 'ASC' }
    });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  findByKey(key: string) {
    return this.repo.findOne({ where: { key } });
  }

  async create(data: Partial<ProductSpecificationEntity>) {
    // Generate key from name if not provided
    if (data.name && !data.key) {
      data.key = FieldKeyUtil.generateKey(data.name);
    }

    // Check if key already exists
    if (data.key) {
      const existing = await this.findByKey(data.key);
      if (existing) {
        throw new Error(`Specification with key '${data.key}' already exists`);
      }
    }

    const specification = this.repo.create(data);
    return this.repo.save(specification);
  }

  async update(id: number, data: Partial<ProductSpecificationEntity>) {
    const specification = await this.findOne(id);
    if (!specification) {
      throw new Error('Specification not found');
    }

    // Generate new key if name changed
    if (data.name && data.name !== specification.name) {
      data.key = FieldKeyUtil.generateKey(data.name);
      
      // Check if new key already exists
      const existing = await this.findByKey(data.key);
      if (existing && existing.id !== id) {
        throw new Error(`Specification with key '${data.key}' already exists`);
      }
    }

    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    const specification = await this.findOne(id);
    if (!specification) {
      throw new Error('Specification not found');
    }

    // Check if this specification is used by any product
    const products = await this.productRepo.find();
    const productsUsingSpec: string[] = [];

    for (const product of products) {
      if (product.specifications && typeof product.specifications === 'object') {
        // Check if the specification key exists in the product's specifications
        if (specification.key && specification.key in product.specifications) {
          productsUsingSpec.push(product.name);
        }
      }
    }

    if (productsUsingSpec.length > 0) {
      const productList = productsUsingSpec.slice(0, 5).join(', ');
      const moreText = productsUsingSpec.length > 5 ? ` and ${productsUsingSpec.length - 5} more` : '';
      throw new Error(
        `Cannot delete specification '${specification.name}'. It is currently used by ${productsUsingSpec.length} product(s): ${productList}${moreText}. Please remove this specification from all products first.`
      );
    }

    await this.repo.remove(specification);
  }
}