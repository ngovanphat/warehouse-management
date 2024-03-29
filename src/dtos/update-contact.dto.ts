import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';

export class UpdateContactDto {
  @ApiProperty({ description: 'First name of contact' })
  @IsString()
  firstName?: string;

  @ApiProperty({ description: 'Last name of contact' })
  @IsString()
  lastName?: string;

  @ApiProperty({ description: 'Email of contact' })
  @IsEmail()
  email?: string;

  @ApiProperty({ description: 'Phone number of contact' })
  @IsPhoneNumber()
  phoneNumber?: string;
}
