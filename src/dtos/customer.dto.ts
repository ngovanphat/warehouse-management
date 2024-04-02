import { ApiProperty } from '@nestjs/swagger';
import { ContactDto } from './contact.dto';

export class CustomerDto {
  @ApiProperty({
    description: 'Id of customer',
  })
  id: string;

  @ApiProperty({
    description: 'Contact of customer',
  })
  contact: ContactDto;

  @ApiProperty({
    description: 'debt of customer',
  })
  debt?: number;
}
