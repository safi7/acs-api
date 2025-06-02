import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
 import { ProductCategoryEntity} from 'src/database/entities';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategoryEntity)
    private repo: Repository<ProductCategoryEntity>
  ) {}

  findAll() {
    return this.repo.find();
  }

  create(productCategory: Partial<ProductCategoryEntity>) {
    const newCategory = this.repo.create(productCategory);
    return this.repo.save(newCategory);
  }
}
