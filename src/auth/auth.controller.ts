import {
  Controller,
  Post,
  Body,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto, LoginDto, RefreshTokenDto } from 'src/dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(
    @Body()
    signUpDto: SignupDto,
  ) {
    try {
      return await this.authService.signUp(signUpDto);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      } else {
        throw new BadRequestException('Something went wrong!');
      }
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      const { accessToken, refreshToken } =
        await this.authService.login(loginDto);
      if (!accessToken || !refreshToken) {
        throw new UnauthorizedException('Invalid username or password');
      }
      return { accessToken, refreshToken };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      } else {
        throw new BadRequestException('Something went wrong!');
      }
    }
  }

  @Post('refresh-token')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    const accessToken = await this.authService.refreshToken(refreshTokenDto);
    if (!accessToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    return { accessToken };
  }
}
