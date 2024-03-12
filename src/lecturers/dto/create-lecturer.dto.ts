import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmptyString } from 'src/validation/is-not-empty-string.validation';

export class CreateLecturerDto {
  @ApiProperty()
  @IsNotEmptyString()
  presentation: string;

  @ApiProperty()
  @IsNotEmptyString()
  about: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
