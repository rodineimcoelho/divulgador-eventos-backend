import { EventType } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { IsNotEmptyString } from 'src/validation/is-not-empty-string.validation';

export class FindAllEventsQuery {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    return value === 'true';
  })
  visible: boolean;

  @IsOptional()
  @IsEnum(EventType)
  @IsNotEmptyString()
  type: EventType;
}
