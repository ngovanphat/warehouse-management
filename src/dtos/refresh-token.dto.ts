// refresh-token.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({ description: 'Refresh token' })
  @IsNotEmpty()
  @IsString()
  refreshToken: string;

  @ApiProperty({ description: 'Access token' })
  @IsNotEmpty()
  @IsString()
  accessToken: string;
}
