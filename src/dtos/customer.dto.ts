import { ApiProperty } from '@nestjs/swagger';
import { ContactDto } from './contact.dto';

export class CustomerDto extends ContactDto {
  @ApiProperty({
    description: 'Id of customer',
  })
  id: string;

  @ApiProperty({
    description: 'debt of customer',
  })
  debt?: number;
}
