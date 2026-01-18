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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../../database/entities");
const promises_1 = require("fs/promises");
const path_1 = require("path");
const fs_1 = require("fs");
let ProductService = class ProductService {
    repo;
    categoryRepo;
    productsPath = (0, path_1.join)(__dirname, '..', '..', '..', 'media', 'products');
    constructor(repo, categoryRepo) {
        this.repo = repo;
        this.categoryRepo = categoryRepo;
        this.ensureProductsDirectory();
    }
    async ensureProductsDirectory() {
        if (!(0, fs_1.existsSync)(this.productsPath)) {
            await (0, promises_1.mkdir)(this.productsPath, { recursive: true });
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
    async createWithFile(fileBuffer, slug, productData) {
        const filename = `${slug}.webp`;
        const filePath = (0, path_1.join)(this.productsPath, filename);
        await (0, promises_1.writeFile)(filePath, fileBuffer);
        const imageUrl = `media/products/${filename}`;
        const newProduct = this.repo.create({
            ...productData,
            imageUrl
        });
        const savedProduct = await this.repo.save(newProduct);
        await this.updateCategoryHasProducts(savedProduct.categorySlug);
        return savedProduct;
    }
    async delete(slug) {
        const product = await this.repo.findOne({ where: { slug } });
        if (!product) {
            throw new Error('Product not found');
        }
        const categorySlug = product.categorySlug;
        if (product.imageUrl) {
            const filename = product.imageUrl.split('/').pop();
            if (filename) {
                const filePath = (0, path_1.join)(this.productsPath, filename);
                if ((0, fs_1.existsSync)(filePath)) {
                    try {
                        await (0, promises_1.unlink)(filePath);
                    }
                    catch (error) {
                        console.error(`Failed to delete product image file ${filePath}:`, error);
                    }
                }
            }
        }
        await this.repo.delete({ slug });
        await this.updateCategoryHasProducts(categorySlug);
    }
    async updateCategoryHasProducts(categorySlug) {
        const productsCount = await this.repo.count({ where: { categorySlug } });
        const category = await this.categoryRepo.findOne({ where: { slug: categorySlug } });
        if (category) {
            const shouldHaveProducts = productsCount > 0;
            if (category.hasProducts !== shouldHaveProducts) {
                await this.categoryRepo.update({ slug: categorySlug }, { hasProducts: shouldHaveProducts });
            }
        }
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.ProductEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.ProductCategoryEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProductService);
//# sourceMappingURL=product.service.js.map