import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GalleryEntity } from 'src/database/entities';
import { StorageService } from 'src/services/storage/storage.service';

const FOLDER = 'gallery';

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(GalleryEntity)
    private repo: Repository<GalleryEntity>,
    private storage: StorageService
  ) {}

  findAll() {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  async createWithFile(
    fileBuffer: Buffer,
    filename: string,
    description?: string,
    title?: string
  ): Promise<GalleryEntity> {
    const fileExtension = filename.split('.').pop() || 'webp';
    const uniqueFilename = `${Date.now()}.${fileExtension}`;

    await this.storage.upload(FOLDER, uniqueFilename, fileBuffer, 'image/webp');

    const newItem = this.repo.create({
      imagePath: uniqueFilename,
      description: description?.substring(0, 200) || null,
      title: title?.substring(0, 50) || null,
    } as any);

    return this.repo.save(newItem) as any;
  }

  create(galleryItem: Partial<GalleryEntity>) {
    const newItem = this.repo.create(galleryItem);
    return this.repo.save(newItem);
  }

  update(id: number, galleryItem: Partial<GalleryEntity>) {
    return this.repo.update(id, galleryItem);
  }

  async delete(id: number): Promise<void> {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new Error('Gallery item not found');

    await this.storage.delete(FOLDER, item.imagePath);
    await this.repo.delete(id);
  }
}
