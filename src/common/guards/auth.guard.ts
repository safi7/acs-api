import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { AuthService } from 'src/services/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.replace('Bearer ', '');

    const user = await this.authService.validateToken(token);

    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    // Attach user to request for use in controllers
    (request as any).user = user;

    return true;
  }
}

