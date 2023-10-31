import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ValidationModule } from 'src/validation/validation.module';
import { IsUniqueEmailConstraint } from './validation/is-unique-email.validation';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ValidationModule],
  controllers: [UsersController],
  providers: [UsersService, IsUniqueEmailConstraint]
})
export class UsersModule {}
