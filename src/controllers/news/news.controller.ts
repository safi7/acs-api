import { Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseInterceptors, UseGuards, Request } from '@nestjs/common';
import { OptionalFileUploadInterceptor } from 'src/common/interceptors/optional-file-upload.interceptor';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { NewsResponseInterface } from 'src/common/interfaces/news.interface';
import mainConfig from 'src/configs/main.config';
import { NewsService } from 'src/services/news/news.service';

@Controller('news')
export class NewsController {
  constructor(private newsS: NewsService) {}

  private toResponse(item: any): NewsResponseInterface {
    return {
      id: item.id,
      title: item.title,
      slug: item.slug,
      content: item.content,
      keywords: item.keywords,
      imagePath: item.imagePath,
      imageUrl: item.imagePath ? `${mainConfig.api_url}/media/news/${item.imagePath}?v=1` : null,
      metaDescription: item.metaDescription,
      isPublished: item.isPublished,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };
  }

  @Get('/all')
  @UseGuards(AuthGuard)
  async getAll(): Promise<NewsResponseInterface[]> {
    const items = await this.newsS.findAll();
    return items.map((item) => this.toResponse(item));
  }

  @Get('/published')
  async getPublished(): Promise<NewsResponseInterface[]> {
    const items = await this.newsS.findAllPublished();
    return items.map((item) => this.toResponse(item));
  }

  @Get('/slug/:slug')
  async getBySlug(@Param('slug') slug: string): Promise<NewsResponseInterface> {
    const item = await this.newsS.findBySlug(slug);
    if (!item) throw new HttpException('News item not found', HttpStatus.NOT_FOUND);
    return this.toResponse(item);
  }

  @Get('/:id')
  async getOne(@Param('id') id: string): Promise<NewsResponseInterface> {
    const item = await this.newsS.findOne(+id);
    if (!item) throw new HttpException('News item not found', HttpStatus.NOT_FOUND);
    return this.toResponse(item);
  }

  @Post('/create')
  @UseGuards(AuthGuard)
  @UseInterceptors(OptionalFileUploadInterceptor)
  async create(@Request() req: any): Promise<NewsResponseInterface> {
    try {
      const fileData = (req as any).fileData;
      const title = req.body?.title;
      const content = req.body?.content;
      const keywords = req.body?.keywords;
      const isPublished = req.body?.isPublished === 'true';

      if (!title || !content || !keywords) {
        throw new HttpException('Title, content and keywords are required', HttpStatus.BAD_REQUEST);
      }

      const item = await this.newsS.createWithFile(
        title,
        content,
        keywords,
        isPublished,
        fileData?.buffer,
        fileData?.filename
      );
      return this.toResponse(item);
    } catch (err) {
      if (err instanceof HttpException) throw err;
      console.error('err', err);
      throw new HttpException('could_not_create_news', HttpStatus.BAD_GATEWAY);
    }
  }

  @Put('/:id')
  @UseGuards(AuthGuard)
  @UseInterceptors(OptionalFileUploadInterceptor)
  async update(@Param('id') id: string, @Request() req: any): Promise<NewsResponseInterface> {
    try {
      const fileData = (req as any).fileData;
      const title = req.body?.title;
      const content = req.body?.content;
      const keywords = req.body?.keywords;
      const isPublished = req.body?.isPublished === 'true';

      if (!title || !content || !keywords) {
        throw new HttpException('Title, content and keywords are required', HttpStatus.BAD_REQUEST);
      }

      await this.newsS.updateWithFile(+id, title, content, keywords, isPublished, fileData?.buffer, fileData?.filename);
      const item = await this.newsS.findOne(+id);
      if (!item) throw new HttpException('News item not found', HttpStatus.NOT_FOUND);
      return this.toResponse(item);
    } catch (err) {
      if (err instanceof HttpException) throw err;
      console.error('err', err);
      throw new HttpException('could_not_update_news', HttpStatus.BAD_GATEWAY);
    }
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  async delete(@Param('id') id: string): Promise<{ status: string }> {
    try {
      await this.newsS.delete(+id);
      return { status: 'okay' };
    } catch (err) {
      if (err instanceof HttpException) throw err;
      console.error('err', err);
      throw new HttpException('could_not_delete_news', HttpStatus.BAD_GATEWAY);
    }
  }
}
