import { BaseEntity } from 'typeorm';
export declare class GalleryEntity extends BaseEntity {
    id: number;
    imagePath: string;
    description: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
}
