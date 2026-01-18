import { BaseEntity } from 'typeorm';
export declare class ProductEntity extends BaseEntity {
    id: number;
    name: string;
    slug: string;
    shortDescription: string;
    fullDescription: string;
    manufacturer: string;
    certifications: string;
    imageUrl: string;
    categorySlug: string;
    specifications: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}
