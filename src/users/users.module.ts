import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ValidationModule } from 'src/validation/validation.module';
import { IsUniqueEmailConstraint } from './validation/is-unique-email.validation';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule, ValidationModule],
  controllers: [UsersController],
  providers: [UsersService, IsUniqueEmailConstraint],
  exports: [UsersService]
})
export class UsersModule {}
