import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { ValidationModule } from 'src/validation/validation.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [ValidationModule, PrismaModule],
  controllers: [EventsController],
  providers: [EventsService]
})
export class EventsModule {}
