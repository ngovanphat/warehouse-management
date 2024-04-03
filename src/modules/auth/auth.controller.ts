import {
  Controller,
  Post,
  Body,
  BadRequestException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';

import { ApiTags, ApiResponse, ApiBody, ApiOperation } from '@nestjs/swagger';

import { SignupDto, LoginDto, RefreshTokenDto } from 'src/dtos';
import { User } from 'src/entities';

import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({
    summary: 'Create a account ',
  })
  @ApiBody({ description: 'User signup details', type: SignupDto })
  @ApiResponse({
    status: 201,
    description: 'User signed up successfully',
    schema: {
      properties: {
        id: {
          type: 'number',
        },
        username: {
          type: 'string',
        },
        email: {
          type: 'string',
        },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        isVerifiedEmail: { type: 'boolean' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    schema: {
      properties: {
        message: { type: 'string', example: 'Invalid email format' },
        error: { type: 'string', example: 'Bad Request' },
        statusCode: { type: 'number', example: 400 },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Username or email already exists',
  })
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
  @ApiOperation({
    summary: 'Login with username and password',
  })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    schema: {
      properties: {
        accessToken: {
          type: 'string',
        },
        refreshToken: {
          type: 'string',
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid username or password' })
  @ApiResponse({ status: 500, description: 'Something went wrong!' })
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
  @ApiOperation({
    summary: 'Renew access token with refresh token',
  })
  @ApiBody({ type: RefreshTokenDto })
  @ApiResponse({
    status: 200,
    description: 'Refresh token successful',
    schema: {
      properties: {
        accessToken: {
          type: 'string',
          example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid refresh token',
  })
  @ApiResponse({
    status: 500,
    description: 'Server error',
  })
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    try {
      const accessToken = await this.authService.refreshToken(refreshTokenDto);
      if (!accessToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }
      return { accessToken };
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong!');
    }
  }
}
