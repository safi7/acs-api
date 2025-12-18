import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class RecaptchaGuard implements CanActivate {
    constructor();
    canActivate(context: ExecutionContext): Promise<boolean>;
}
