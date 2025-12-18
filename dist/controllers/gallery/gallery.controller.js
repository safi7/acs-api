"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GalleryController = void 0;
const common_1 = require("@nestjs/common");
const file_upload_interceptor_1 = require("../../common/interceptors/file-upload.interceptor");
const auth_guard_1 = require("../../common/guards/auth.guard");
const gallery_dto_1 = require("../../common/dto/gallery.dto");
const main_config_1 = require("../../configs/main.config");
const gallery_service_1 = require("../../services/gallery/gallery.service");
let GalleryController = class GalleryController {
    galleryS;
    constructor(galleryS) {
        this.galleryS = galleryS;
    }
    async getAll() {
        const version = 1;
        const items = await this.galleryS.findAll();
        return items.map((item) => ({
            id: item.id,
            imagePath: item.imagePath,
            imageUrl: `${main_config_1.default.api_url}/media/gallery/${item.imagePath}?v=${version}`,
            description: item.description,
            title: item.title,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt
        }));
    }
    async getOne(id) {
        const item = await this.galleryS.findOne(+id);
        if (!item) {
            throw new common_1.HttpException('Gallery item not found', common_1.HttpStatus.NOT_FOUND);
        }
        return {
            id: item.id,
            imagePath: item.imagePath,
            imageUrl: `${main_config_1.default.api_url}/media/gallery/${item.imagePath}?v=1`,
            description: item.description,
            title: item.title,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt
        };
    }
    async create(params) {
        try {
            const item = await this.galleryS.create(params);
            return {
                id: item.id,
                imagePath: item.imagePath,
                imageUrl: `${main_config_1.default.api_url}/media/gallery/${item.imagePath}?v=1`,
                description: item.description,
                title: item.title,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt
            };
        }
        catch (err) {
            console.error('err', err);
            throw new common_1.HttpException('could_not_create_a_record', common_1.HttpStatus.BAD_GATEWAY);
        }
    }
    async update(id, params) {
        try {
            await this.galleryS.update(+id, params);
            const item = await this.galleryS.findOne(+id);
            if (!item) {
                throw new common_1.HttpException('Gallery item not found', common_1.HttpStatus.NOT_FOUND);
            }
            return {
                id: item.id,
                imagePath: item.imagePath,
                imageUrl: `${main_config_1.default.api_url}/media/gallery/${item.imagePath}?v=1`,
                description: item.description,
                title: item.title,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt
            };
        }
        catch (err) {
            console.error('err', err);
            throw new common_1.HttpException('could_not_update_a_record', common_1.HttpStatus.BAD_GATEWAY);
        }
    }
    async upload(req) {
        try {
            const fileData = req.fileData;
            if (!fileData) {
                throw new common_1.HttpException('File data not found', common_1.HttpStatus.BAD_REQUEST);
            }
            const description = req.body?.description;
            const title = req.body?.title;
            const item = await this.galleryS.createWithFile(fileData.buffer, fileData.filename, description, title);
            return {
                id: item.id,
                imagePath: item.imagePath,
                imageUrl: `${main_config_1.default.api_url}/media/gallery/${item.imagePath}?v=1`,
                description: item.description,
                title: item.title,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt
            };
        }
        catch (err) {
            console.error('err', err);
            if (err instanceof common_1.HttpException) {
                throw err;
            }
            throw new common_1.HttpException('could_not_upload_image', common_1.HttpStatus.BAD_GATEWAY);
        }
    }
    async delete(id) {
        try {
            await this.galleryS.delete(+id);
            return { status: 'okay' };
        }
        catch (err) {
            console.error('err', err);
            if (err instanceof common_1.HttpException) {
                throw err;
            }
            throw new common_1.HttpException(err instanceof Error ? err.message : 'could_not_delete_a_record', common_1.HttpStatus.BAD_GATEWAY);
        }
    }
};
exports.GalleryController = GalleryController;
__decorate([
    (0, common_1.Get)('/all'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GalleryController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GalleryController.prototype, "getOne", null);
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [gallery_dto_1.GalleryCreateDto]),
    __metadata("design:returntype", Promise)
], GalleryController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, gallery_dto_1.GalleryUpdateDto]),
    __metadata("design:returntype", Promise)
], GalleryController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('/upload'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UseInterceptors)(file_upload_interceptor_1.FileUploadInterceptor),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GalleryController.prototype, "upload", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GalleryController.prototype, "delete", null);
exports.GalleryController = GalleryController = __decorate([
    (0, common_1.Controller)('gallery'),
    __metadata("design:paramtypes", [gallery_service_1.GalleryService])
], GalleryController);
//# sourceMappingURL=gallery.controller.js.map