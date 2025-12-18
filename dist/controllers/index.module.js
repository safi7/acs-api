"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexControllerModule = void 0;
const common_1 = require("@nestjs/common");
const product_controller_module_1 = require("./product/product.controller.module");
const contact_controller_module_1 = require("./contact/contact.controller.module");
const gallery_controller_module_1 = require("./gallery/gallery.controller.module");
const auth_controller_module_1 = require("./auth/auth.controller.module");
const stats_controller_module_1 = require("./stats/stats.controller.module");
let IndexControllerModule = class IndexControllerModule {
};
exports.IndexControllerModule = IndexControllerModule;
exports.IndexControllerModule = IndexControllerModule = __decorate([
    (0, common_1.Module)({
        imports: [product_controller_module_1.ProductControllerModule, contact_controller_module_1.ContactControllerModule, gallery_controller_module_1.GalleryControllerModule, auth_controller_module_1.AuthControllerModule, stats_controller_module_1.StatsControllerModule]
    })
], IndexControllerModule);
//# sourceMappingURL=index.module.js.map