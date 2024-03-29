import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateContactDto {
  @ApiProperty({ description: 'First name of contact' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'Last name of contact' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'Email of contact' })
  @IsEmail()
  email?: string;

  @ApiProperty({ description: 'Phone number of contact' })
  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;
}
