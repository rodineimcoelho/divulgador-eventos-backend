import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { validate } from './env.validation';
import { UsersModule } from './users/users.module';
import { ValidationModule } from './validation/validation.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ validate, isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [User]
      }),
      inject: [ConfigService]
    }),
    UsersModule,
    ValidationModule
  ]
})
export class AppModule {}
