import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsJWT } from 'class-validator';

export default class RefreshTokenDto {
  @ApiProperty()
  @IsJWT()
  @IsDefined()
  refresh_token: string;
}
