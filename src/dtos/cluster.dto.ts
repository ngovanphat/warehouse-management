import { ApiProperty } from '@nestjs/swagger';

export class ClusterDto {
  @ApiProperty({ description: 'ID of the cluster' })
  id: string;

  @ApiProperty({ description: 'Name of the cluster' })
  name: string;

  @ApiProperty({ description: 'Id of the genres' })
  genresId: string;
}
