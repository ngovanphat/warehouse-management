import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateClusterDto {
  @ApiProperty({ description: 'Name of the cluster' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Id of genres' })
  @IsNotEmpty()
  @IsString()
  genresId: string;
}
