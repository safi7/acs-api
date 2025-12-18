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
exports.GalleryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const promises_1 = require("fs/promises");
const path_1 = require("path");
const fs_1 = require("fs");
const uuid_1 = require("uuid");
const entities_1 = require("../../database/entities");
let GalleryService = class GalleryService {
    repo;
    galleryPath = (0, path_1.join)(__dirname, '..', '..', '..', 'media', 'gallery');
    constructor(repo) {
        this.repo = repo;
        this.ensureGalleryDirectory();
    }
    async ensureGalleryDirectory() {
        if (!(0, fs_1.existsSync)(this.galleryPath)) {
            await (0, promises_1.mkdir)(this.galleryPath, { recursive: true });
        }
    }
    findAll() {
        return this.repo.find({
            order: {
                createdAt: 'DESC'
            }
        });
    }
    findOne(id) {
        return this.repo.findOne({ where: { id } });
    }
    async createWithFile(fileBuffer, filename, description, title) {
        const fileExtension = filename.split('.').pop() || 'webp';
        const uniqueFilename = `${(0, uuid_1.v4)()}.${fileExtension}`;
        const filePath = (0, path_1.join)(this.galleryPath, uniqueFilename);
        await (0, promises_1.writeFile)(filePath, fileBuffer);
        const newItem = this.repo.create({
            imagePath: uniqueFilename,
            description: description?.substring(0, 200) || null,
            title: title?.substring(0, 50) || null
        });
        return this.repo.save(newItem);
    }
    create(galleryItem) {
        const newItem = this.repo.create(galleryItem);
        return this.repo.save(newItem);
    }
    update(id, galleryItem) {
        return this.repo.update(id, galleryItem);
    }
    async delete(id) {
        const item = await this.repo.findOne({ where: { id } });
        if (!item) {
            throw new Error('Gallery item not found');
        }
        const filePath = (0, path_1.join)(this.galleryPath, item.imagePath);
        if ((0, fs_1.existsSync)(filePath)) {
            try {
                await (0, promises_1.unlink)(filePath);
            }
            catch (error) {
                console.error(`Failed to delete file ${filePath}:`, error);
            }
        }
        await this.repo.delete(id);
    }
};
exports.GalleryService = GalleryService;
exports.GalleryService = GalleryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.GalleryEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], GalleryService);
//# sourceMappingURL=gallery.service.js.map