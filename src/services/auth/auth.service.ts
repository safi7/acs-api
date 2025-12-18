import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CrmUserEntity } from 'src/database/entities';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(CrmUserEntity)
    private crmUserRepo: Repository<CrmUserEntity>
  ) {}

  async login(username: string, password: string): Promise<{ token: string; username: string }> {
    const user = await this.crmUserRepo.findOne({ where: { username } });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate a simple token
    const token = this.generateToken();

    // Store token in database
    user.token = token;
    await this.crmUserRepo.save(user);

    return {
      token,
      username: user.username
    };
  }

  async validateToken(token: string): Promise<CrmUserEntity | null> {
    if(!token || token === 'undefined' || token === 'null' || token === '') {
      return null;
    }
    const user = await this.crmUserRepo.findOne({ where: { token } });
    return user;
  }

  async logout(token: string): Promise<void> {
    const user = await this.crmUserRepo.findOne({ where: { token } });
    if (user) {
      await this.crmUserRepo.update(user.id, { token: undefined });
    }
  }

  private generateToken(): string {
    return randomBytes(32).toString('hex');
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }
}

