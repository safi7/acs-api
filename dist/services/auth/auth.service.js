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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const entities_1 = require("../../database/entities");
const crypto_1 = require("crypto");
let AuthService = class AuthService {
    crmUserRepo;
    constructor(crmUserRepo) {
        this.crmUserRepo = crmUserRepo;
    }
    async login(username, password) {
        const user = await this.crmUserRepo.findOne({ where: { username } });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const token = this.generateToken();
        user.token = token;
        await this.crmUserRepo.save(user);
        return {
            token,
            username: user.username
        };
    }
    async validateToken(token) {
        if (!token || token === 'undefined' || token === 'null' || token === '') {
            return null;
        }
        const user = await this.crmUserRepo.findOne({ where: { token } });
        return user;
    }
    async logout(token) {
        const user = await this.crmUserRepo.findOne({ where: { token } });
        if (user) {
            await this.crmUserRepo.update(user.id, { token: undefined });
        }
    }
    generateToken() {
        return (0, crypto_1.randomBytes)(32).toString('hex');
    }
    async hashPassword(password) {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.CrmUserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AuthService);
//# sourceMappingURL=auth.service.js.map