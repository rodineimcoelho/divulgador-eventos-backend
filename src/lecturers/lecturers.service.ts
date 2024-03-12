import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { CreateLecturerDto } from './dto/create-lecturer.dto';
import { UpdateLecturerDto } from './dto/update-lecturer.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as path from 'path';
import { Lecturer } from '@prisma/client';
import { randomUUID } from 'crypto';
import { ImagesService } from 'src/images/images.service';

@Injectable()
export class LecturersService {
  constructor(
    private prismaService: PrismaService,
    private imagesService: ImagesService
  ) {}

  async create(
    createLecturerDto: CreateLecturerDto,
    image: Express.Multer.File
  ) {
    const lecturer = await this.prismaService.lecturer.create({
      data: {
        ...createLecturerDto,
        imageName: `${randomUUID()}${path.extname(image.originalname)}`
      }
    });

    try {
      this.storeLecturerImage(lecturer, image);
    } catch (error) {
      await this.remove(lecturer.id);
      throw new InternalServerErrorException();
    }
  }

  storeLecturerImage(lecturer: Lecturer, image: Express.Multer.File) {
    return this.imagesService.create(image, lecturer.imageName);
  }

  findAll() {
    return this.prismaService.lecturer.findMany();
  }

  async findOne(id: string, includeEvents: boolean = false) {
    const lecturer = await this.prismaService.lecturer.findUnique({
      where: { id },
      include: { events: includeEvents }
    });
    if (!lecturer) throw new NotFoundException(['lecturer not found']);
    return lecturer;
  }

  async update(
    id: string,
    updateLecturerDto?: UpdateLecturerDto,
    image?: Express.Multer.File
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { events, ...lecturer } = await this.findOne(id);
    const imageName = image
      ? `${randomUUID()}${path.extname(image.originalname)}`
      : undefined;

    const updatedLecturer = await this.prismaService.lecturer.update({
      where: { id },
      data: {
        ...updateLecturerDto,
        imageName
      }
    });

    if (image)
      try {
        await this.storeLecturerImage(updatedLecturer, image);
      } catch (error) {
        await this.prismaService.lecturer.update({
          where: { id },
          data: lecturer
        });
        throw new InternalServerErrorException();
      }
  }

  async remove(id: string) {
    const lecturer = await this.findOne(id, true);

    if (lecturer.events.length) {
      throw new BadRequestException(['lecturer have events']);
    }

    await this.prismaService.lecturer.delete({ where: { id } });
    await this.imagesService.remove(lecturer.imageName);
  }
}
