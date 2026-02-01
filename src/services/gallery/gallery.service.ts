import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { writeFile, mkdir, unlink } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import { GalleryEntity } from 'src/database/entities';

@Injectable()
export class GalleryService {
  private readonly galleryPath = join(__dirname, '..', '..', '..', 'media', 'gallery');

  constructor(
    @InjectRepository(GalleryEntity)
    private repo: Repository<GalleryEntity>
  ) {
    // Ensure gallery directory exists
    this.ensureGalleryDirectory();
  }

  private async ensureGalleryDirectory() {
    try {
      if (!existsSync(this.galleryPath)) {
        await mkdir(this.galleryPath, { recursive: true });
      }
    } catch (error) {
      console.warn(`Could not create gallery directory: ${error.message}`);
    }
  }

  findAll() {
    return this.repo.find({
      order: {
        createdAt: 'DESC'
      }
    });
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
    // Generate unique filename
    const fileExtension = filename.split('.').pop() || 'webp';
    const uniqueFilename = `${new Date().getTime()}.${fileExtension}`;
    const filePath = join(this.galleryPath, uniqueFilename);

    // Save file to disk
    await writeFile(filePath, fileBuffer);

    // Create database record
    const newItem = this.repo.create({
      imagePath: uniqueFilename,
      description: description?.substring(0, 200) || null, // Max 200 chars
      title: title?.substring(0, 50) || null // Max 50 chars
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
    // Find the item first to get the file path
    const item = await this.repo.findOne({ where: { id } });
    if (!item) {
      throw new Error('Gallery item not found');
    }

    // Delete the file from disk
    const filePath = join(this.galleryPath, item.imagePath);
    if (existsSync(filePath)) {
      try {
        await unlink(filePath);
      } catch (error) {
        console.error(`Failed to delete file ${filePath}:`, error);
        // Continue with DB deletion even if file deletion fails
      }
    }

    // Delete from database
    await this.repo.delete(id);
  }
}


