import { Body, Controller, Post, UseGuards, Request, HttpException, HttpStatus } from '@nestjs/common';
import { LoginDto } from 'src/common/dto/auth.dto';
import { LoginResponseInterface } from 'src/common/interfaces/auth.interface';
import { AuthService } from 'src/services/auth/auth.service';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authS: AuthService) {}

  @Post('login')
  async login(@Body() params: LoginDto): Promise<LoginResponseInterface> {
    try {
      return await this.authS.login(params.username, params.password);
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      console.error('err', err);
      throw new HttpException('could_not_login', HttpStatus.BAD_GATEWAY);
    }
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  async logout(@Request() req: any): Promise<{ status: string }> {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');
      if (token) {
        await this.authS.logout(token);
      }
      return { status: 'okay' };
    } catch (err) {
      console.error('err', err);
      throw new HttpException('could_not_logout', HttpStatus.BAD_GATEWAY);
    }
  }
}

