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
exports.ErrorsInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
let ErrorsInterceptor = class ErrorsInterceptor {
    logger;
    constructor(logger) {
        this.logger = logger;
    }
    intercept(context, call$) {
        return call$.handle().pipe((0, operators_1.catchError)((err) => {
            let stringErr = '';
            try {
                stringErr = err ? (err.message ? err.message : err) : '';
            }
            catch (error) { }
            if (err.status) {
                if (err.status !== common_1.HttpStatus.I_AM_A_TEAPOT) {
                    this.logger.error(stringErr, `${context.getClass().name}/${context.getHandler().name}`, err.status.toString());
                }
                return (0, rxjs_1.throwError)(() => new common_1.HttpException(stringErr, err.status));
            }
            this.logger.error(stringErr, `${context.getClass().name}/${context.getHandler().name}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR.toString());
            return (0, rxjs_1.throwError)(() => new common_1.HttpException(stringErr, common_1.HttpStatus.INTERNAL_SERVER_ERROR));
        }));
    }
};
exports.ErrorsInterceptor = ErrorsInterceptor;
exports.ErrorsInterceptor = ErrorsInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [common_1.Logger])
], ErrorsInterceptor);
//# sourceMappingURL=errors.interceptor.js.map