import { BaseEntity } from 'typeorm';
import { ProductEntity } from './product.entity';
export declare class ProductCategoryEntity extends BaseEntity {
    id: number;
    title: string;
    slug: string;
    description: string;
    imageUrl: string;
    hasProducts: boolean;
    createdAt: Date;
    updatedAt: Date;
    products: ProductEntity[];
}
