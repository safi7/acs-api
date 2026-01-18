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
    shortDescription;
    manufacturer;
    certifications;
    imageUrl;
    categorySlug;
    specifications;
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
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(html_sanitizer_validator_1.HtmlSanitizer),
    __metadata("design:type", String)
], ProductCreateDto.prototype, "shortDescription", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(html_sanitizer_validator_1.HtmlSanitizer),
    __metadata("design:type", String)
], ProductCreateDto.prototype, "manufacturer", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(html_sanitizer_validator_1.HtmlSanitizer),
    __metadata("design:type", String)
], ProductCreateDto.prototype, "certifications", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(html_sanitizer_validator_1.HtmlSanitizer),
    __metadata("design:type", String)
], ProductCreateDto.prototype, "imageUrl", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(html_sanitizer_validator_1.HtmlSanitizer),
    __metadata("design:type", String)
], ProductCreateDto.prototype, "categorySlug", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], ProductCreateDto.prototype, "specifications", void 0);
//# sourceMappingURL=category.dto.js.map