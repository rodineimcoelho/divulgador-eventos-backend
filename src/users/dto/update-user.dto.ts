import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmptyString } from 'src/validation/is-not-empty-string.validation';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  @IsNotEmptyString()
  currentPassword: string;
}
