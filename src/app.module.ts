import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './env.validation';
import { UsersModule } from './users/users.module';
import { ValidationModule } from './validation/validation.module';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './redis/redis.module';
import { PrismaModule } from './prisma/prisma.module';
import { EventsModule } from './events/events.module';
import { LecturersModule } from './lecturers/lecturers.module';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [
    ConfigModule.forRoot({ validate, isGlobal: true }),
    UsersModule,
    ValidationModule,
    AuthModule,
    RedisModule,
    PrismaModule,
    EventsModule,
    LecturersModule,
    ImagesModule
  ]
})
export class AppModule {}
