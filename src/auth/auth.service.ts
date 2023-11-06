import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { TokenType } from './enum/token-type.enum';
import { randomUUID } from 'crypto';
import { RedisService } from 'src/redis/redis.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private redisService: RedisService
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) return user;

    throw new UnauthorizedException();
  }

  login(user: User) {
    return {
      user: this.usersService.excludePasswordFields(user),
      access_token: this.jwtService.sign(
        { sub: user.id, tokenType: TokenType.ACCESS_TOKEN },
        { expiresIn: '1h' }
      ),
      refresh_token: this.jwtService.sign(
        { sub: user.id, tokenType: TokenType.REFRESH_TOKEN },
        { expiresIn: '8h', jwtid: randomUUID() }
      )
    };
  }

  async refresh(refreshToken: string) {
    const refreshTokenPayload = this.jwtService.verify(refreshToken);

    if (await this.redisService.get(refreshTokenPayload.jti))
      throw new UnauthorizedException();

    const user = await this.usersService.findById(refreshTokenPayload.sub);

    if (user) {
      if (
        user.passwordUpdateDate &&
        user?.passwordUpdateDate.getTime() / 1000 >= refreshTokenPayload.iat
      )
        throw new UnauthorizedException();

      this.redisService.set(
        refreshTokenPayload.jti,
        refreshToken,
        'EXAT',
        refreshTokenPayload.exp
      );

      return this.login(user);
    }

    throw new UnauthorizedException();
  }
}
