import { ApiProperty } from '@nestjs/swagger';

export class ContactDto {
  @ApiProperty({
    description: 'Id of contact',
  })
  id: string;

  @ApiProperty({ description: 'First name of contact' })
  firstName?: string;

  @ApiProperty({ description: 'Last name of contact' })
  lastName?: string;

  @ApiProperty({ description: 'Phone number of contact' })
  phoneNumber?: string;

  @ApiProperty({ description: 'Email of contact' })
  email?: string;
}
