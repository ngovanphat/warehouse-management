// refresh-token.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @IsNotEmpty()
  @IsString()
  refreshToken: string;

  @IsNotEmpty()
  @IsString()
  accessToken: string;
}
