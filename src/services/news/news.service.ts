import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsEntity } from 'src/database/entities';
import { StorageService } from 'src/services/storage/storage.service';

const FOLDER = 'news';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(NewsEntity)
    private repo: Repository<NewsEntity>,
    private storage: StorageService
  ) {}

  private generateSlug(title: string): string {
    const plainTitle = title.replace(/<[^>]*>/g, '');
    const base = plainTitle
      .substring(0, 50)
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .trim()
      .replace(/\s+/g, '_');
    return `${base}_${Date.now()}`;
  }

  private generateMetaDescription(content: string): string {
    return content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().substring(0, 160);
  }

  findAll() {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  findAllPublished() {
    return this.repo.find({ where: { isPublished: true }, order: { createdAt: 'DESC' } });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  findBySlug(slug: string) {
    return this.repo.findOne({ where: { slug } });
  }

  async createWithFile(
    title: string,
    content: string,
    keywords: string,
    isPublished: boolean,
    fileBuffer?: Buffer,
    filename?: string
  ): Promise<NewsEntity> {
    let imagePath: string | null = null;

    if (fileBuffer && filename) {
      const ext = filename.split('.').pop() || 'webp';
      const uniqueFilename = `${Date.now()}.${ext}`;
      await this.storage.upload(FOLDER, uniqueFilename, fileBuffer, 'image/webp');
      imagePath = uniqueFilename;
    }

    const newItem = this.repo.create({
      title,
      slug: this.generateSlug(title),
      content,
      keywords,
      imagePath,
      metaDescription: this.generateMetaDescription(content),
      isPublished,
    } as any);

    return this.repo.save(newItem) as any;
  }

  async update(id: number, data: Partial<NewsEntity>): Promise<void> {
    await this.repo.update(id, data);
  }

  async updateWithFile(
    id: number,
    title: string,
    content: string,
    keywords: string,
    isPublished: boolean,
    fileBuffer?: Buffer,
    filename?: string
  ): Promise<void> {
    const existing = await this.repo.findOne({ where: { id } });
    if (!existing) throw new Error('News item not found');

    const updateData: Partial<NewsEntity> = {
      title,
      content,
      keywords,
      metaDescription: this.generateMetaDescription(content),
      isPublished,
    };

    if (fileBuffer && filename) {
      if (existing.imagePath) {
        await this.storage.delete(FOLDER, existing.imagePath);
      }
      const ext = filename.split('.').pop() || 'webp';
      const uniqueFilename = `${Date.now()}.${ext}`;
      await this.storage.upload(FOLDER, uniqueFilename, fileBuffer, 'image/webp');
      updateData.imagePath = uniqueFilename;
    }

    await this.repo.update(id, updateData);
  }

  async delete(id: number): Promise<void> {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new Error('News item not found');

    if (item.imagePath) {
      await this.storage.delete(FOLDER, item.imagePath);
    }

    await this.repo.delete(id);
  }
}
