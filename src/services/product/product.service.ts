import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
 import { ProductEntity} from 'src/database/entities';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private repo: Repository<ProductEntity>
  ) {}

  findAll() {
    return this.repo.find();
  }

  create(productCategory: Partial<ProductEntity>) {
    const newCategory = this.repo.create(productCategory);
    return this.repo.save(newCategory);
  }
}
