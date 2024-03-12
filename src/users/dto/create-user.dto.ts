import { IsEmail, MinLength } from 'class-validator';
import { IsUniqueEmail } from '../validation/is-unique-email.validation';
import { IsNotEmptyString } from 'src/validation/is-not-empty-string.validation';
import { Match } from 'src/validation/match.validation';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmptyString()
  fullName: string;

  @ApiProperty()
  @IsUniqueEmail()
  @IsEmail()
  @IsNotEmptyString()
  email: string;

  @ApiProperty()
  @MinLength(8)
  @IsNotEmptyString()
  password: string;

  @ApiProperty()
  @Match('password')
  @IsNotEmptyString()
  passwordConfirmation: string;
}
