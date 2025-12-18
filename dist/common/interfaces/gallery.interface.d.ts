export interface GalleryResponseInterface {
    id: number;
    imagePath: string;
    imageUrl: string;
    description: string | null;
    title: string | null;
    createdAt: Date;
    updatedAt: Date;
}
