import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  ParseUUIDPipe
} from '@nestjs/common';
import { LecturersService } from './lecturers.service';
import { CreateLecturerDto } from './dto/create-lecturer.dto';
import { UpdateLecturerDto } from './dto/update-lecturer.dto';
import { AdminOnly } from 'src/auth/guards/admin-only.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';

@ApiTags('lecturers')
@Controller('lecturers')
export class LecturersController {
  constructor(private readonly lecturersService: LecturersService) {}

  @UseGuards(JwtAuthGuard, AdminOnly)
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @Post()
  create(
    @Body() createLecturerDto: CreateLecturerDto,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: true,
        validators: [new FileTypeValidator({ fileType: 'image' })]
      })
    )
    image: Express.Multer.File
  ) {
    return this.lecturersService.create(createLecturerDto, image);
  }

  @Get()
  findAll() {
    return this.lecturersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.lecturersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, AdminOnly)
  @UseInterceptors(FileInterceptor('image'))
  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateLecturerDto: UpdateLecturerDto,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [new FileTypeValidator({ fileType: 'image' })]
      })
    )
    image?: Express.Multer.File
  ) {
    return this.lecturersService.update(id, updateLecturerDto, image);
  }

  @UseGuards(JwtAuthGuard, AdminOnly)
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.lecturersService.remove(id);
  }
}
