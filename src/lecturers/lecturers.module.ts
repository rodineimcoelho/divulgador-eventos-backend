import { Module } from '@nestjs/common';
import { LecturersService } from './lecturers.service';
import { LecturersController } from './lecturers.controller';
import { ValidationModule } from 'src/validation/validation.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ImagesModule } from 'src/images/images.module';

@Module({
  imports: [ValidationModule, PrismaModule, ImagesModule],
  controllers: [LecturersController],
  providers: [LecturersService]
})
export class LecturersModule {}
