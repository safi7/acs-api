import { Repository } from 'typeorm';
import { GalleryEntity } from 'src/database/entities';
export declare class GalleryService {
    private repo;
    private readonly galleryPath;
    constructor(repo: Repository<GalleryEntity>);
    private ensureGalleryDirectory;
    findAll(): Promise<GalleryEntity[]>;
    findOne(id: number): Promise<GalleryEntity | null>;
    createWithFile(fileBuffer: Buffer, filename: string, description?: string, title?: string): Promise<GalleryEntity>;
    create(galleryItem: Partial<GalleryEntity>): Promise<GalleryEntity>;
    update(id: number, galleryItem: Partial<GalleryEntity>): Promise<import("typeorm").UpdateResult>;
    delete(id: number): Promise<void>;
}
