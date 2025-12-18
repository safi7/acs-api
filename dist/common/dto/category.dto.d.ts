export declare class CategoryCreateDto {
    title: string;
    description: string;
    imageUrl: string;
    slug: string;
}
export declare class ProductCreateDto {
    name: string;
    slug: string;
    categorySlug: string;
    type?: string;
    keyWords?: string;
    composition?: string;
    coating?: string;
    colour?: string;
    tissueReaction?: string;
    absorption?: string;
    presentation?: string;
    needleTypeUrl?: string;
    completeSheet?: string;
    indications?: string;
    benefits?: string;
    orderNumber?: string;
}
