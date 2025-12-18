"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsServiceModule = void 0;
const common_1 = require("@nestjs/common");
const stats_service_1 = require("./stats.service");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("../../database/entities");
let StatsServiceModule = class StatsServiceModule {
};
exports.StatsServiceModule = StatsServiceModule;
exports.StatsServiceModule = StatsServiceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                entities_1.ProductEntity,
                entities_1.ProductCategoryEntity,
                entities_1.CrmUserEntity,
                entities_1.GalleryEntity
            ])
        ],
        providers: [stats_service_1.StatsService],
        exports: [stats_service_1.StatsService]
    })
], StatsServiceModule);
//# sourceMappingURL=stats.service.module.js.map