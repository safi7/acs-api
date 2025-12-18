import { GalleryCreateDto, GalleryUpdateDto } from 'src/common/dto/gallery.dto';
import { GalleryResponseInterface } from 'src/common/interfaces/gallery.interface';
import { GalleryService } from 'src/services/gallery/gallery.service';
export declare class GalleryController {
    private galleryS;
    constructor(galleryS: GalleryService);
    getAll(): Promise<GalleryResponseInterface[]>;
    getOne(id: string): Promise<GalleryResponseInterface>;
    create(params: GalleryCreateDto): Promise<GalleryResponseInterface>;
    update(id: string, params: GalleryUpdateDto): Promise<GalleryResponseInterface>;
    upload(req: any): Promise<GalleryResponseInterface>;
    delete(id: string): Promise<{
        status: string;
    }>;
}
