import {
  Controller,
  Post,
  Body,
  BadRequestException,
  BadGatewayException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(
    @Body()
    body: {
      username: string;
      password: string;
      email: string;
      firstName?: string;
      lastName?: string;
    },
  ) {
    const { username, password, email, firstName, lastName } = body;
    try {
      return await this.authService.signUp({
        username,
        password,
        email,
        firstName,
        lastName,
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      } else {
        throw new BadRequestException('Something went wrong!');
      }
    }
  }
}
