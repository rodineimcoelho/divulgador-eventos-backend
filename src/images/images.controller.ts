import {
  Controller,
  Get,
  NotFoundException,
  Param,
  StreamableFile
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { join } from 'path';
import * as fs from 'fs';

@ApiTags('images')
@Controller('images')
export class ImagesController {
  @Get(':name')
  getImage(@Param('name') name: string): StreamableFile {
    const imagePath = join(process.cwd(), 'images', name);

    if (!fs.existsSync(imagePath))
      throw new NotFoundException(['image not found']);

    const image = fs.createReadStream(imagePath);
    return new StreamableFile(image);
  }
}
