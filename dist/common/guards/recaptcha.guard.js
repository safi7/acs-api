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
exports.RecaptchaGuard = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const main_config_1 = require("../../configs/main.config");
let RecaptchaGuard = class RecaptchaGuard {
    constructor() { }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = request.body.recaptchaToken;
        if (!token) {
            throw new common_1.UnauthorizedException('reCAPTCHA token missing');
        }
        const { data } = await axios_1.default.post(main_config_1.default.recaptcha_api_url, new URLSearchParams({ secret: main_config_1.default.recaptcha_secret_key, response: token }));
        if (!data.success || data.score < 0.5) {
            throw new common_1.UnauthorizedException('Invalid reCAPTCHA');
        }
        return true;
    }
};
exports.RecaptchaGuard = RecaptchaGuard;
exports.RecaptchaGuard = RecaptchaGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], RecaptchaGuard);
//# sourceMappingURL=recaptcha.guard.js.map