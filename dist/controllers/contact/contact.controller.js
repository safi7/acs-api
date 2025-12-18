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
exports.ContactController = void 0;
const common_1 = require("@nestjs/common");
const contact_dto_1 = require("../../common/dto/contact.dto");
const contact_service_1 = require("../../services/contact/contact.service");
const email_validator_1 = require("../../common/validators/email.validator");
let ContactController = class ContactController {
    contactS;
    constructor(contactS) {
        this.contactS = contactS;
    }
    async sendFeedback(params) {
        if (!(0, email_validator_1.isValidEmail)(params.email)) {
            throw new common_1.HttpException('invalid_email', common_1.HttpStatus.BAD_REQUEST);
        }
        try {
            await this.contactS.sendTelegramMessage(params);
        }
        catch (err) {
            console.log('err', err);
            throw new common_1.HttpException('could_not_send_a_feedback', common_1.HttpStatus.BAD_REQUEST);
        }
        return { status: 'okay' };
    }
};
exports.ContactController = ContactController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contact_dto_1.FeedbackDto]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "sendFeedback", null);
exports.ContactController = ContactController = __decorate([
    (0, common_1.Controller)('contact'),
    __metadata("design:paramtypes", [contact_service_1.ContactService])
], ContactController);
//# sourceMappingURL=contact.controller.js.map