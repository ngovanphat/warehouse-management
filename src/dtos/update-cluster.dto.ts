import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateClusterDto {
  @ApiProperty({ description: 'Name of the cluster' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
