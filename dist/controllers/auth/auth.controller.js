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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_dto_1 = require("../../common/dto/auth.dto");
const auth_service_1 = require("../../services/auth/auth.service");
const auth_guard_1 = require("../../common/guards/auth.guard");
let AuthController = class AuthController {
    authS;
    constructor(authS) {
        this.authS = authS;
    }
    async login(params) {
        try {
            return await this.authS.login(params.username, params.password);
        }
        catch (err) {
            if (err instanceof common_1.HttpException) {
                throw err;
            }
            console.error('err', err);
            throw new common_1.HttpException('could_not_login', common_1.HttpStatus.BAD_GATEWAY);
        }
    }
    async logout(req) {
        try {
            const token = req.headers.authorization?.replace('Bearer ', '');
            if (token) {
                await this.authS.logout(token);
            }
            return { status: 'okay' };
        }
        catch (err) {
            console.error('err', err);
            throw new common_1.HttpException('could_not_logout', common_1.HttpStatus.BAD_GATEWAY);
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map