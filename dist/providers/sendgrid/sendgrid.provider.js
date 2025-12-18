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
exports.SendgridProvider = void 0;
const common_1 = require("@nestjs/common");
const main_config_1 = require("../../configs/main.config");
const sgMail = require("@sendgrid/mail");
let SendgridProvider = class SendgridProvider {
    constructor() {
        sgMail.setApiKey(`${main_config_1.default.sendgrid_api_key}`);
    }
    async sendEmail(input) {
        const message = {
            from: `${main_config_1.default.from_email}`,
            to: main_config_1.default.target_email,
            subject: `Customer Feedback ${input.name}`,
            text: `Name: ${input.name}\nEmail: ${input.email},\nMessage: ${input.message}`
        };
        return await sgMail.send(message);
    }
};
exports.SendgridProvider = SendgridProvider;
exports.SendgridProvider = SendgridProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], SendgridProvider);
//# sourceMappingURL=sendgrid.provider.js.map