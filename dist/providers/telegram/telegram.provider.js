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
exports.TelegramProvider = void 0;
const common_1 = require("@nestjs/common");
const main_config_1 = require("../../configs/main.config");
const sgMail = require("@sendgrid/mail");
const axios_1 = require("axios");
let TelegramProvider = class TelegramProvider {
    constructor() {
        sgMail.setApiKey(`${main_config_1.default.sendgrid_api_key}`);
    }
    async sendMessage(message) {
        try {
            const payload = {
                chat_id: main_config_1.default.telegram_channel_id,
                text: message,
                parse_mode: 'HTML'
            };
            await axios_1.default.post(`${main_config_1.default.telegram_api_url}`, payload);
        }
        catch (error) {
            console.log('error', error);
            throw new common_1.HttpException('Failed to send message', common_1.HttpStatus.EXPECTATION_FAILED);
        }
    }
};
exports.TelegramProvider = TelegramProvider;
exports.TelegramProvider = TelegramProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], TelegramProvider);
//# sourceMappingURL=telegram.provider.js.map