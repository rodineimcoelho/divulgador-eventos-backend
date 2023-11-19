import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as fsPromises from 'fs/promises';

@Injectable()
export class ImagesService {
  private readonly imagesDirectoryPath = 'images';

  constructor() {
    if (!fs.existsSync(this.imagesDirectoryPath)) {
      fs.mkdirSync(this.imagesDirectoryPath);
    }
  }

  create(image: Express.Multer.File, name: string) {
    return fsPromises.writeFile(
      `${this.imagesDirectoryPath}/${name}`,
      image.buffer
    );
  }

  remove(name: string) {
    return fsPromises.unlink(`${this.imagesDirectoryPath}/${name}`);
  }
}
