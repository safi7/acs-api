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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCreateDto = exports.CategoryCreateDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const html_sanitizer_validator_1 = require("../validators/html-sanitizer.validator");
class CategoryCreateDto {
    title;
    description;
    imageUrl;
    slug;
}
exports.CategoryCreateDto = CategoryCreateDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(html_sanitizer_validator_1.HtmlSanitizer),
    __metadata("design:type", String)
], CategoryCreateDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(html_sanitizer_validator_1.HtmlSanitizer),
    __metadata("design:type", String)
], CategoryCreateDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(html_sanitizer_validator_1.HtmlSanitizer),
    __metadata("design:type", String)
], CategoryCreateDto.prototype, "imageUrl", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(html_sanitizer_validator_1.HtmlSanitizer),
    __metadata("design:type", String)
], CategoryCreateDto.prototype, "slug", void 0);
class ProductCreateDto {
    name;
    slug;
    categorySlug;
    type;
    keyWords;
    composition;
    coating;
    colour;
    tissueReaction;
    absorption;
    presentation;
    needleTypeUrl;
    completeSheet;
    indications;
    benefits;
    orderNumber;
}
exports.ProductCreateDto = ProductCreateDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(html_sanitizer_validator_1.HtmlSanitizer),
    __metadata("design:type", String)
], ProductCreateDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(html_sanitizer_validator_1.HtmlSanitizer),
    __metadata("design:type", String)
], ProductCreateDto.prototype, "slug", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(html_sanitizer_validator_1.HtmlSanitizer),
    __metadata("design:type", String)
], ProductCreateDto.prototype, "categorySlug", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(html_sanitizer_validator_1.HtmlSanitizer),
    __metadata("design:type", String)
], ProductCreateDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(html_sanitizer_validator_1.HtmlSanitizer),
    __metadata("design:type", String)
], ProductCreateDto.prototype, "keyWords", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(html_sanitizer_validator_1.HtmlSanitizer),
    __metadata("design:type", String)
], ProductCreateDto.prototype, "composition", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(html_sanitizer_validator_1.HtmlSanitizer),
    __metadata("design:type", String)
], ProductCreateDto.prototype, "coating", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(html_sanitizer_validator_1.HtmlSanitizer),
    __metadata("design:type", String)
], ProductCreateDto.prototype, "colour", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(html_sanitizer_validator_1.HtmlSanitizer),
    __metadata("design:type", String)
], ProductCreateDto.prototype, "tissueReaction", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(html_sanitizer_validator_1.HtmlSanitizer),
    __metadata("design:type", String)
], ProductCreateDto.prototype, "absorption", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(html_sanitizer_validator_1.HtmlSanitizer),
    __metadata("design:type", String)
], ProductCreateDto.prototype, "presentation", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(html_sanitizer_validator_1.HtmlSanitizer),
    __metadata("design:type", String)
], ProductCreateDto.prototype, "needleTypeUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(html_sanitizer_validator_1.HtmlSanitizer),
    __metadata("design:type", String)
], ProductCreateDto.prototype, "completeSheet", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(html_sanitizer_validator_1.HtmlSanitizer),
    __metadata("design:type", String)
], ProductCreateDto.prototype, "indications", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(html_sanitizer_validator_1.HtmlSanitizer),
    __metadata("design:type", String)
], ProductCreateDto.prototype, "benefits", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(html_sanitizer_validator_1.HtmlSanitizer),
    __metadata("design:type", String)
], ProductCreateDto.prototype, "orderNumber", void 0);
//# sourceMappingURL=category.dto.js.map