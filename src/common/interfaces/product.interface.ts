export interface ProductResponseInterface {
  id: number;
  name: string;
  slug: string;
  shortDescription?: string;
  manufacturer?: string;
  certifications?: string;
  categorySlug: string;
  imageUrl: string;
  specifications: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductSpecificationInterface {
  id: number;
  name: string;
  key: string;
  description?: string;
  fieldType: string;
  options?: any;
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}
