import { BaseEntity } from 'typeorm';
export declare class ProductEntity extends BaseEntity {
    id: number;
    name: string;
    slug: string;
    categorySlug: string;
    type: string;
    keyWords: string;
    composition: string;
    coating: string;
    colour: string;
    tissueReaction: string;
    absorption: string;
    presentation: string;
    needleTypeUrl: string;
    completeSheet: string;
    indications: string;
    benefits: string;
    orderNumber: string;
    createdAt: Date;
    updatedAt: Date;
}
