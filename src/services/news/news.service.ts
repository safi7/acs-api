import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { writeFile, mkdir, unlink } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import { NewsEntity } from 'src/database/entities';

@Injectable()
export class NewsService {
  private readonly newsMediaPath = join(__dirname, '..', '..', '..', 'media', 'news');

  constructor(
    @InjectRepository(NewsEntity)
    private repo: Repository<NewsEntity>
  ) {
    this.ensureDirectory();
  }

  private async ensureDirectory() {
    try {
      if (!existsSync(this.newsMediaPath)) {
        await mkdir(this.newsMediaPath, { recursive: true });
      }
    } catch (error) {
      console.warn(`Could not create news media directory: ${error.message}`);
    }
  }

  private generateSlug(title: string): string {
    const plainTitle = title.replace(/<[^>]*>/g, '');
    const base = plainTitle
      .substring(0, 50)
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .trim()
      .replace(/\s+/g, '_');
    const timestamp = Date.now();
    return `${base}_${timestamp}`;
  }

  private generateMetaDescription(content: string): string {
    return content
      .replace(/<[^>]*>/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 160);
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
      const fileExtension = filename.split('.').pop() || 'webp';
      const uniqueFilename = `${new Date().getTime()}.${fileExtension}`;
      const filePath = join(this.newsMediaPath, uniqueFilename);
      await writeFile(filePath, fileBuffer);
      imagePath = uniqueFilename;
    }

    const slug = this.generateSlug(title);

    const newItem = this.repo.create({
      title,
      slug,
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

    const updateData: Partial<NewsEntity> = { title, content, keywords, metaDescription: this.generateMetaDescription(content), isPublished };

    if (fileBuffer && filename) {
      if (existing.imagePath) {
        const oldPath = join(this.newsMediaPath, existing.imagePath);
        if (existsSync(oldPath)) {
          try { await unlink(oldPath); } catch {}
        }
      }
      const fileExtension = filename.split('.').pop() || 'webp';
      const uniqueFilename = `${new Date().getTime()}.${fileExtension}`;
      await writeFile(join(this.newsMediaPath, uniqueFilename), fileBuffer);
      updateData.imagePath = uniqueFilename;
    }

    await this.repo.update(id, updateData);
  }

  async delete(id: number): Promise<void> {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new Error('News item not found');

    if (item.imagePath) {
      const filePath = join(this.newsMediaPath, item.imagePath);
      if (existsSync(filePath)) {
        try { await unlink(filePath); } catch {}
      }
    }

    await this.repo.delete(id);
  }
}
