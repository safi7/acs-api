export interface productResponseInterface {
  id: number;
  name: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  categorySlug: string;
  manufacturer: string;
  certifications: string[];
  specifications: Record<string, string>;
  createdAt: Date;
}


