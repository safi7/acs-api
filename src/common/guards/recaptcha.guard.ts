import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import { Request } from 'express';
import mainConfig from 'src/configs/main.config';

@Injectable()
export class RecaptchaGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.body.recaptchaToken;

    if (!token) {
      throw new UnauthorizedException('reCAPTCHA token missing');
    }

    const { data } = await axios.post(
      mainConfig.recaptcha_api_url,
      new URLSearchParams({ secret: mainConfig.recaptcha_secret_key, response: token })
    );

    if (!data.success || data.score < 0.5) {
      throw new UnauthorizedException('Invalid reCAPTCHA');
    }

    return true;
  }
}
