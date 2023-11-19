import { ApiProperty } from '@nestjs/swagger';
import { EventModality, EventType } from '@prisma/client';
import {
  IsBoolean,
  IsDate,
  IsDefined,
  IsEnum,
  IsOptional,
  IsUUID,
  ValidateIf
} from 'class-validator';
import { IsGreaterOrEqualThan } from 'src/validation/is-greater-or-equal-than';
import { IsNotEmptyString } from 'src/validation/is-not-empty-string.validation';

export class CreateEventDto {
  @ApiProperty()
  @IsNotEmptyString()
  title: string;

  @ApiProperty()
  @IsEnum(EventType)
  @IsDefined()
  type: EventType;

  @ApiProperty()
  @IsUUID()
  @IsNotEmptyString()
  lecturerId: string;

  @ApiProperty()
  @IsEnum(EventModality)
  @IsDefined()
  modality: EventModality;

  @ApiProperty()
  @IsNotEmptyString()
  abstract: string;

  @IsDate()
  @IsDefined()
  startDate: Date;

  @IsGreaterOrEqualThan('startDate')
  @IsDate()
  @IsDefined()
  endDate: Date;

  @ValidateIf((object) => object.modality === EventModality.IN_PERSON)
  @IsNotEmptyString()
  location?: string;

  @ValidateIf((object) => object.modality === EventModality.ONLINE)
  @IsNotEmptyString()
  link?: string;

  @IsOptional()
  @IsBoolean()
  isVisible?: boolean;
}
