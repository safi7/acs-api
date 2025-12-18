"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GalleryControllerModule = void 0;
const common_1 = require("@nestjs/common");
const gallery_controller_1 = require("./gallery.controller");
const gallery_service_module_1 = require("../../services/gallery/gallery.service.module");
const guards_module_1 = require("../../common/guards/guards.module");
const auth_service_module_1 = require("../../services/auth/auth.service.module");
let GalleryControllerModule = class GalleryControllerModule {
};
exports.GalleryControllerModule = GalleryControllerModule;
exports.GalleryControllerModule = GalleryControllerModule = __decorate([
    (0, common_1.Module)({
        imports: [gallery_service_module_1.GalleryServiceModule, guards_module_1.GuardsModule, auth_service_module_1.AuthServiceModule],
        providers: [],
        controllers: [gallery_controller_1.GalleryController]
    })
], GalleryControllerModule);
//# sourceMappingURL=gallery.controller.module.js.map