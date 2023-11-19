import { PartialType } from '@nestjs/swagger';
import { CreateEventDto } from './create-event.dto';
import { EventModality } from '@prisma/client';
import { ValidateIf } from 'class-validator';
import { IsNotEmptyString } from 'src/validation/is-not-empty-string.validation';

export class UpdateEventDto extends PartialType(CreateEventDto) {
  @ValidateIf((object) => object.modality === EventModality.IN_PERSON)
  @IsNotEmptyString()
  location?: string;

  @ValidateIf((object) => object.modality === EventModality.ONLINE)
  @IsNotEmptyString()
  link?: string;
}
