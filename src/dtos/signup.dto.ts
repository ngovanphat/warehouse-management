// signup.dto.ts
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Username of the user' })
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: 'Email of the user' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @ApiProperty({ description: 'Password of the user' })
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'First name of the user' })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Last name of the user' })
  lastName: string;
}
