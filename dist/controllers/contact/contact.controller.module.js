"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactControllerModule = void 0;
const common_1 = require("@nestjs/common");
const contact_controller_1 = require("./contact.controller");
const contact_service_module_1 = require("../../services/contact/contact.service.module");
let ContactControllerModule = class ContactControllerModule {
};
exports.ContactControllerModule = ContactControllerModule;
exports.ContactControllerModule = ContactControllerModule = __decorate([
    (0, common_1.Module)({
        imports: [contact_service_module_1.ContactServiceModule],
        providers: [],
        controllers: [contact_controller_1.ContactController]
    })
], ContactControllerModule);
//# sourceMappingURL=contact.controller.module.js.map