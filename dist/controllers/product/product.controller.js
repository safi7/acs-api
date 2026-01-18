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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const main_config_1 = require("../../configs/main.config");
const category_service_1 = require("../../services/product/category.service");
const product_service_1 = require("../../services/product/product.service");
const product_specification_service_1 = require("../../services/product/product-specification.service");
const auth_guard_1 = require("../../common/guards/auth.guard");
const file_upload_interceptor_1 = require("../../common/interceptors/file-upload.interceptor");
let ProductController = class ProductController {
    productCategoryS;
    productS;
    productSpecificationS;
    constructor(productCategoryS, productS, productSpecificationS) {
        this.productCategoryS = productCategoryS;
        this.productS = productS;
        this.productSpecificationS = productSpecificationS;
    }
    async getCategories() {
        const version = 2;
        const categories = await this.productCategoryS.findAll();
        return categories.map((v) => ({
            ...v,
            hasProducts: v.hasProducts,
            imageUrl: `${main_config_1.default.api_url}/${v.imageUrl}?v=${version}`
        }));
    }
    async createCategories(req) {
        try {
            const fileData = req.fileData;
            if (!fileData) {
                throw new common_1.HttpException('Image file is required', common_1.HttpStatus.BAD_REQUEST);
            }
            const title = req.body?.title;
            const description = req.body?.description;
            const slug = req.body?.slug;
            if (!title || !description || !slug) {
                throw new common_1.HttpException('Title, description, and slug are required', common_1.HttpStatus.BAD_REQUEST);
            }
            const category = await this.productCategoryS.createWithFile(fileData.buffer, slug, title, description);
            return {
                id: category.id,
                title: category.title,
                description: category.description,
                slug: category.slug,
                hasProducts: category.hasProducts,
                imageUrl: `${main_config_1.default.api_url}/${category.imageUrl}`,
                createdAt: category.createdAt
            };
        }
        catch (err) {
            console.error('err', err);
            if (err instanceof common_1.HttpException) {
                throw err;
            }
            throw new common_1.HttpException('could_not_create_a_record', common_1.HttpStatus.BAD_GATEWAY);
        }
    }
    async getProducts() {
        const version = 2;
        const products = await this.productS.findAll();
        return products.map((product) => ({
            id: product.id,
            name: product.name,
            slug: product.slug,
            shortDescription: product.shortDescription,
            manufacturer: product.manufacturer,
            certifications: product.certifications,
            categorySlug: product.categorySlug,
            imageUrl: `${main_config_1.default.api_url}/media/products/${product.slug}.webp?v=${version}`,
            specifications: this.processSpecifications(product.specifications || {}, product.slug),
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
        }));
    }
    async getProduct(slug) {
        const product = await this.productS.findOne(slug);
        if (!product) {
            throw new common_1.HttpException('Product not found', common_1.HttpStatus.NOT_FOUND);
        }
        return {
            id: product.id,
            name: product.name,
            slug: product.slug,
            shortDescription: product.shortDescription,
            manufacturer: product.manufacturer,
            certifications: product.certifications,
            categorySlug: product.categorySlug,
            imageUrl: `${main_config_1.default.api_url}/media/products/${product.slug}.webp`,
            specifications: this.processSpecifications(product.specifications || {}, product.slug),
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
        };
    }
    async createProduct(req) {
        try {
            const fileData = req.fileData;
            if (!fileData) {
                throw new common_1.HttpException('Image file is required', common_1.HttpStatus.BAD_REQUEST);
            }
            const name = req.body?.name;
            const slug = req.body?.slug;
            const categorySlug = req.body?.categorySlug;
            const shortDescription = req.body?.shortDescription;
            const manufacturer = req.body?.manufacturer;
            const certifications = req.body?.certifications;
            const specifications = req.body?.specifications ? JSON.parse(req.body.specifications) : undefined;
            if (!name || !slug || !categorySlug) {
                throw new common_1.HttpException('Name, slug, and categorySlug are required', common_1.HttpStatus.BAD_REQUEST);
            }
            const product = await this.productS.createWithFile(fileData.buffer, slug, {
                name,
                slug,
                categorySlug,
                shortDescription,
                manufacturer,
                certifications,
                specifications
            });
            return {
                id: product.id,
                name: product.name,
                slug: product.slug,
                shortDescription: product.shortDescription,
                manufacturer: product.manufacturer,
                certifications: product.certifications,
                categorySlug: product.categorySlug,
                imageUrl: `${main_config_1.default.api_url}/${product.imageUrl}`,
                specifications: this.processSpecifications(product.specifications || {}, product.slug),
                createdAt: product.createdAt,
                updatedAt: product.updatedAt
            };
        }
        catch (err) {
            console.error('err', err);
            if (err instanceof common_1.HttpException) {
                throw err;
            }
            throw new common_1.HttpException('could_not_create_a_record', common_1.HttpStatus.BAD_GATEWAY);
        }
    }
    async getProductSpecifications() {
        return this.productSpecificationS.findAll();
    }
    async createProductSpecification(params) {
        try {
            return await this.productSpecificationS.create(params);
        }
        catch (err) {
            console.error('err', err);
            throw new common_1.HttpException(err.message || 'could_not_create_specification', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteCategory(slug) {
        try {
            await this.productCategoryS.delete(slug);
            return {
                status: 'success',
                message: 'Category deleted successfully'
            };
        }
        catch (err) {
            console.error('Delete category error:', err);
            const errorMessage = err instanceof Error ? err.message : 'Could not delete category';
            throw new common_1.HttpException(errorMessage, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteProduct(slug) {
        try {
            await this.productS.delete(slug);
            return {
                status: 'success',
                message: 'Product deleted successfully'
            };
        }
        catch (err) {
            console.error('Delete product error:', err);
            const errorMessage = err instanceof Error ? err.message : 'Could not delete product';
            throw new common_1.HttpException(errorMessage, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteProductSpecification(id) {
        try {
            await this.productSpecificationS.delete(+id);
            return {
                status: 'success',
                message: 'Specification deleted successfully'
            };
        }
        catch (err) {
            console.error('Delete specification error:', err);
            const errorMessage = err instanceof Error ? err.message : 'Could not delete specification';
            throw new common_1.HttpException(errorMessage, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    processSpecifications(specifications, productSlug) {
        if (!specifications || typeof specifications !== 'object') {
            return specifications;
        }
        const processed = { ...specifications };
        if (processed.needle_type_url && typeof processed.needle_type_url === 'string') {
            processed.needle_type_url = `${main_config_1.default.api_url}/media/products/needle-type/Needle-type.pdf`;
        }
        if (processed.complete_sheet && typeof processed.complete_sheet === 'string') {
            processed.complete_sheet = `${main_config_1.default.api_url}/media/products/complete-sheet/${productSlug}.pdf`;
        }
        return processed;
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.Get)('category/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getCategories", null);
__decorate([
    (0, common_1.Post)('category/create'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UseInterceptors)(file_upload_interceptor_1.FileUploadInterceptor),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createCategories", null);
__decorate([
    (0, common_1.Get)('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProducts", null);
__decorate([
    (0, common_1.Get)('/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProduct", null);
__decorate([
    (0, common_1.Post)('/create'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UseInterceptors)(file_upload_interceptor_1.FileUploadInterceptor),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createProduct", null);
__decorate([
    (0, common_1.Get)('/specifications/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProductSpecifications", null);
__decorate([
    (0, common_1.Post)('/specifications/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createProductSpecification", null);
__decorate([
    (0, common_1.Delete)('/category/:slug'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteCategory", null);
__decorate([
    (0, common_1.Delete)('/:slug'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteProduct", null);
__decorate([
    (0, common_1.Delete)('/specifications/:id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteProductSpecification", null);
exports.ProductController = ProductController = __decorate([
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [category_service_1.ProductCategoryService,
        product_service_1.ProductService,
        product_specification_service_1.ProductSpecificationService])
], ProductController);
//# sourceMappingURL=product.controller.js.map