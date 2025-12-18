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
exports.ContactService = void 0;
const common_1 = require("@nestjs/common");
const sendgrid_provider_1 = require("../../providers/sendgrid/sendgrid.provider");
const telegram_provider_1 = require("../../providers/telegram/telegram.provider");
let ContactService = class ContactService {
    contactP;
    telegramP;
    constructor(contactP, telegramP) {
        this.contactP = contactP;
        this.telegramP = telegramP;
    }
    async sendFeedback(input) {
        return await this.contactP.sendEmail(input);
    }
    async sendTelegramMessage(input) {
        const formattedMessage = `
          <b>📥 New Inquiry Received</b>\n
          <b>Name:</b> ${input.name}\n
          <b>Email:</b> ${input.email}\n\n
          <b>Message:</b> ${input.message}.
          `;
        return await this.telegramP.sendMessage(formattedMessage);
    }
};
exports.ContactService = ContactService;
exports.ContactService = ContactService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [sendgrid_provider_1.SendgridProvider,
        telegram_provider_1.TelegramProvider])
], ContactService);
//# sourceMappingURL=contact.service.js.map