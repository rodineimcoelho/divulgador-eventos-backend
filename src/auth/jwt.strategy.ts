import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, SecretOrKeyProvider, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
import { TokenType } from './enum/token-type.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService
  ) {
    const secretProvider: SecretOrKeyProvider = (
      _request,
      _rawJwtToken,
      done
    ) => {
      const secret = this.configService.get<string>('JWT_SECRET');
      done(undefined, secret);
    };

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKeyProvider: secretProvider
    });
  }

  async validate(payload: any) {
    if (payload.tokenType === TokenType.ACCESS_TOKEN) {
      const user = await this.usersService.findById(payload.sub);

      if (user) {
        const { passwordUpdateDate } = user;

        if (
          !passwordUpdateDate ||
          passwordUpdateDate.getTime() / 1000 < payload.iat
        )
          return user;
      }
    }

    throw new UnauthorizedException();
  }
}
