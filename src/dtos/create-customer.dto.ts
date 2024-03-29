import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({ description: 'First name of customer' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'Last name of customer' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'Email of customer' })
  @IsEmail()
  email?: string;

  @ApiProperty({ description: 'Phone number of customer' })
  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;
}
