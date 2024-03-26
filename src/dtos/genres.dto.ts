import { ApiProperty } from '@nestjs/swagger';

export class GenresDto {
  @ApiProperty({ description: 'ID of the genre' })
  id: string;

  @ApiProperty({ description: 'Name of the genre' })
  name: string;
}
