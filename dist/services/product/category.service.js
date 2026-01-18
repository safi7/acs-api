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
exports.ProductCategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../../database/entities");
const promises_1 = require("fs/promises");
const path_1 = require("path");
const fs_1 = require("fs");
let ProductCategoryService = class ProductCategoryService {
    repo;
    productRepo;
    categoriesPath = (0, path_1.join)(__dirname, '..', '..', '..', 'media', 'products', 'categories');
    constructor(repo, productRepo) {
        this.repo = repo;
        this.productRepo = productRepo;
        this.ensureCategoriesDirectory();
    }
    async ensureCategoriesDirectory() {
        if (!(0, fs_1.existsSync)(this.categoriesPath)) {
            await (0, promises_1.mkdir)(this.categoriesPath, { recursive: true });
        }
    }
    findAll() {
        return this.repo.find({
            order: {
                createdAt: 'DESC'
            }
        });
    }
    findOne(slug) {
        return this.repo.findOne({ where: { slug } });
    }
    create(productCategory) {
        const newCategory = this.repo.create(productCategory);
        return this.repo.save(newCategory);
    }
    async createWithFile(fileBuffer, slug, title, description) {
        const filename = `${slug}.webp`;
        const filePath = (0, path_1.join)(this.categoriesPath, filename);
        await (0, promises_1.writeFile)(filePath, fileBuffer);
        const imageUrl = `media/products/categories/${filename}`;
        const newCategory = this.repo.create({
            title,
            slug,
            description,
            imageUrl
        });
        return this.repo.save(newCategory);
    }
    async delete(slug) {
        const category = await this.repo.findOne({ where: { slug } });
        if (!category) {
            throw new Error('Category not found');
        }
        const productsCount = await this.productRepo.count({ where: { categorySlug: slug } });
        if (productsCount > 0) {
            throw new Error(`Cannot delete category. It has ${productsCount} product(s) associated with it. Please remove or reassign the products first.`);
        }
        if (category.imageUrl) {
            const filename = category.imageUrl.split('/').pop();
            if (filename) {
                const filePath = (0, path_1.join)(this.categoriesPath, filename);
                if ((0, fs_1.existsSync)(filePath)) {
                    try {
                        await (0, promises_1.unlink)(filePath);
                    }
                    catch (error) {
                        console.error(`Failed to delete category image file ${filePath}:`, error);
                    }
                }
            }
        }
        await this.repo.delete({ slug });
    }
};
exports.ProductCategoryService = ProductCategoryService;
exports.ProductCategoryService = ProductCategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.ProductCategoryEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.ProductEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProductCategoryService);
//# sourceMappingURL=category.service.js.map