import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '@prisma/client';

@Injectable()
export class LibrarianOnlyGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const user: User = context.switchToHttp().getRequest().user;
    if (!user.isAdmin) {
      throw new ForbiddenException('you must be a admin');
    }
    return true;
  }
}
