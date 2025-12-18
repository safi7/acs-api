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
const category_dto_1 = require("../../common/dto/category.dto");
const main_config_1 = require("../../configs/main.config");
const category_service_1 = require("../../services/product/category.service");
const product_service_1 = require("../../services/product/product.service");
let ProductController = class ProductController {
    productCategoryS;
    productS;
    constructor(productCategoryS, productS) {
        this.productCategoryS = productCategoryS;
        this.productS = productS;
    }
    async getCategories() {
        const version = 2;
        const categories = await this.productCategoryS.findAll();
        const hasProducts = ['medical-devices'];
        return categories.map((v) => ({
            ...v,
            hasProducts: hasProducts.includes(v.slug),
            imageUrl: `${main_config_1.default.api_url}/${v.imageUrl}?v=${version}`
        }));
    }
    async createCategories(params) {
        try {
            const category = await this.productCategoryS.create(params);
            const hasProducts = ['medical-devices'];
            return {
                id: category.id,
                title: category.title,
                description: category.description,
                slug: category.slug,
                hasProducts: hasProducts.includes(category.slug),
                imageUrl: category.imageUrl,
                createdAt: category.createdAt
            };
        }
        catch (err) {
            console.error('err', err);
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
            categorySlug: product.categorySlug,
            imageUrl: `${main_config_1.default.api_url}/media/products/${product.slug}.webp?v=${version}`,
            type: product.type,
            keyWords: product.keyWords,
            composition: product.composition,
            coating: product.coating,
            colour: product.colour,
            tissueReaction: product.tissueReaction,
            absorption: product.absorption,
            presentation: product.presentation,
            needleTypeUrl: product.needleTypeUrl ? `${main_config_1.default.api_url}/media/products/needle-type/Needle-type.pdf` : product.needleTypeUrl,
            completeSheet: product.completeSheet ? `${main_config_1.default.api_url}/media/products/complete-sheet/${product.slug}.pdf` : product.completeSheet,
            indications: product.indications,
            benefits: product.benefits,
            orderNumber: product.orderNumber,
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
            categorySlug: product.categorySlug,
            imageUrl: `${main_config_1.default.api_url}/media/products/${product.slug}.webp`,
            type: product.type,
            keyWords: product.keyWords,
            composition: product.composition,
            coating: product.coating,
            colour: product.colour,
            tissueReaction: product.tissueReaction,
            absorption: product.absorption,
            presentation: product.presentation,
            needleTypeUrl: product.needleTypeUrl ? `${main_config_1.default.api_url}/media/products/needle-type/Needle-type.pdf` : product.needleTypeUrl,
            completeSheet: product.completeSheet ? `${main_config_1.default.api_url}/media/products/complete-sheet/${product.slug}.pdf` : product.completeSheet,
            indications: product.indications,
            benefits: product.benefits,
            orderNumber: product.orderNumber,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
        };
    }
    async createProduct(params) {
        try {
            const product = await this.productS.create(params);
            return {
                id: product.id,
                name: product.name,
                slug: product.slug,
                keyWords: product.keyWords,
                categorySlug: product.categorySlug,
                imageUrl: `${main_config_1.default.api_url}/media/products/${product.name}.webp`,
                type: product.type,
                composition: product.composition,
                coating: product.coating,
                colour: product.colour,
                tissueReaction: product.tissueReaction,
                absorption: product.absorption,
                presentation: product.presentation,
                needleTypeUrl: product.needleTypeUrl,
                completeSheet: product.completeSheet,
                indications: product.indications,
                benefits: product.benefits,
                orderNumber: product.orderNumber,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt
            };
        }
        catch (err) {
            console.error('err', err);
            throw new common_1.HttpException('could_not_create_a_record', common_1.HttpStatus.BAD_GATEWAY);
        }
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
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_dto_1.CategoryCreateDto]),
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
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_dto_1.ProductCreateDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createProduct", null);
exports.ProductController = ProductController = __decorate([
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [category_service_1.ProductCategoryService,
        product_service_1.ProductService])
], ProductController);
//# sourceMappingURL=product.controller.js.map