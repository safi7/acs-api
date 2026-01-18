"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductControllerModule = void 0;
const common_1 = require("@nestjs/common");
const product_controller_1 = require("./product.controller");
const category_service_module_1 = require("../../services/product/category.service.module");
const product_service_module_1 = require("../../services/product/product.service.module");
const product_specification_service_module_1 = require("../../services/product/product-specification.service.module");
const auth_service_module_1 = require("../../services/auth/auth.service.module");
let ProductControllerModule = class ProductControllerModule {
};
exports.ProductControllerModule = ProductControllerModule;
exports.ProductControllerModule = ProductControllerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            category_service_module_1.ProductCategoryServiceModule,
            product_service_module_1.ProductServiceModule,
            product_specification_service_module_1.ProductSpecificationServiceModule,
            auth_service_module_1.AuthServiceModule
        ],
        providers: [],
        controllers: [product_controller_1.ProductController]
    })
], ProductControllerModule);
//# sourceMappingURL=product.controller.module.js.map