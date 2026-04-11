export interface NewsResponseInterface {
  id: number;
  title: string;
  slug: string;
  content: string;
  keywords: string;
  imagePath: string | null;
  imageUrl: string | null;
  metaDescription: string | null;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}
