import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ErrorMessages } from '../enum/error-messages.enum';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any) {
    if (err || !user)
      throw new UnauthorizedException([ErrorMessages.TOKEN_ERROR]);

    return user;
  }
}
