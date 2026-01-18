import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSpecificationEntity } from 'src/database/entities';
import { FieldKeyUtil } from 'src/common/utils/field-key.util';

@Injectable()
export class ProductSpecificationService {
  constructor(
    @InjectRepository(ProductSpecificationEntity)
    private repo: Repository<ProductSpecificationEntity>
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

  async delete(id: number) {
    const specification = await this.findOne(id);
    if (!specification) {
      throw new Error('Specification not found');
    }

    return this.repo.remove(specification);
  }
}