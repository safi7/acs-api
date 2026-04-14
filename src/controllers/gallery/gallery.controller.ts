import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseInterceptors, UseGuards, Request } from '@nestjs/common';
import { FileUploadInterceptor } from 'src/common/interceptors/file-upload.interceptor';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { GalleryCreateDto, GalleryUpdateDto } from 'src/common/dto/gallery.dto';
import { GalleryResponseInterface } from 'src/common/interfaces/gallery.interface';
import { GalleryService } from 'src/services/gallery/gallery.service';
import { StorageService } from 'src/services/storage/storage.service';

@Controller('gallery')
export class GalleryController {
  constructor(
    private galleryS: GalleryService,
    private storage: StorageService
  ) {}

  private toResponse(item: any): GalleryResponseInterface {
    return {
      id: item.id,
      imagePath: item.imagePath,
      imageUrl: this.storage.getPublicUrl('gallery', item.imagePath),
      description: item.description,
      title: item.title,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };
  }

  @Get('/all')
  async getAll(): Promise<GalleryResponseInterface[]> {
    const items = await this.galleryS.findAll();
    return items.map((item) => this.toResponse(item));
  }

  @Get('/:id')
  async getOne(@Param('id') id: string): Promise<GalleryResponseInterface> {
    const item = await this.galleryS.findOne(+id);
    if (!item) throw new HttpException('Gallery item not found', HttpStatus.NOT_FOUND);
    return this.toResponse(item);
  }

  @Post('/create')
  @UseGuards(AuthGuard)
  async create(@Body() params: GalleryCreateDto): Promise<GalleryResponseInterface> {
    try {
      const item = await this.galleryS.create(params);
      return this.toResponse(item);
    } catch (err) {
      console.error('err', err);
      throw new HttpException('could_not_create_a_record', HttpStatus.BAD_GATEWAY);
    }
  }

  @Put('/:id')
  @UseGuards(AuthGuard)
  async update(@Param('id') id: string, @Body() params: GalleryUpdateDto): Promise<GalleryResponseInterface> {
    try {
      await this.galleryS.update(+id, params);
      const item = await this.galleryS.findOne(+id);
      if (!item) throw new HttpException('Gallery item not found', HttpStatus.NOT_FOUND);
      return this.toResponse(item);
    } catch (err) {
      console.error('err', err);
      throw new HttpException('could_not_update_a_record', HttpStatus.BAD_GATEWAY);
    }
  }

  @Post('/upload')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileUploadInterceptor)
  async upload(@Request() req: any): Promise<GalleryResponseInterface> {
    try {
      const fileData = (req as any).fileData;
      if (!fileData) throw new HttpException('File data not found', HttpStatus.BAD_REQUEST);

      const description = (req.body as any)?.description;
      const title = (req.body as any)?.title;
      const item = await this.galleryS.createWithFile(fileData.buffer, fileData.filename, description, title);
      return this.toResponse(item);
    } catch (err) {
      console.error('err', err);
      if (err instanceof HttpException) throw err;
      throw new HttpException('could_not_upload_image', HttpStatus.BAD_GATEWAY);
    }
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  async delete(@Param('id') id: string): Promise<{ status: string }> {
    try {
      await this.galleryS.delete(+id);
      return { status: 'okay' };
    } catch (err) {
      console.error('err', err);
      if (err instanceof HttpException) throw err;
      throw new HttpException(err instanceof Error ? err.message : 'could_not_delete_a_record', HttpStatus.BAD_GATEWAY);
    }
  }
}
