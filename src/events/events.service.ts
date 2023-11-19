import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { EventType } from '@prisma/client';

@Injectable()
export class EventsService {
  constructor(private prismaService: PrismaService) {}

  async create(createEventDto: CreateEventDto) {
    return this.prismaService.event.create({ data: createEventDto });
  }

  async findAll(visible?: boolean, type?: EventType) {
    return this.prismaService.event.findMany({
      where: { isVisible: visible, type: type },
      include: { lecturer: true },
      orderBy: { startDate: 'asc' }
    });
  }

  findOne(id: string, includeLecturer?: boolean) {
    return this.prismaService.event.findUnique({
      where: { id },
      include: { lecturer: includeLecturer }
    });
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    const event = await this.findOne(id);
    if (!event) throw new NotFoundException(['event not found']);

    if (updateEventDto.endDate && updateEventDto.endDate < event?.startDate) {
      throw new NotFoundException([
        'endDate must be greater or equal than the event current start date'
      ]);
    }

    await this.prismaService.event.update({
      where: { id },
      data: updateEventDto
    });
  }

  async remove(id: string) {
    const event = await this.findOne(id);
    if (!event) throw new NotFoundException(['event not found']);
    await this.prismaService.event.delete({ where: { id } });
  }
}
