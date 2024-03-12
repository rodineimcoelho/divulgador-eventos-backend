import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';
import { IsNotEmptyString } from 'src/validation/is-not-empty-string.validation';

export class LoginDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmptyString()
  email: string;

  @ApiProperty()
  @MinLength(8)
  @IsNotEmptyString()
  password: string;
}
