export declare class CategoryCreateDto {
    title: string;
    description: string;
    imageUrl: string;
    slug: string;
}
export declare class ProductCreateDto {
    name: string;
    slug: string;
    shortDescription?: string;
    manufacturer?: string;
    certifications?: string;
    imageUrl?: string;
    categorySlug: string;
    specifications?: Record<string, any>;
}
