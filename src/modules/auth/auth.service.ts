import {
  BadRequestException,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import * as bcrypt from 'bcryptjs';

import { User } from '../../entities/user.entity';
import { SignupDto, LoginDto, RefreshTokenDto } from 'src/dtos';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signUp({
    username,
    email,
    firstName,
    lastName,
    password,
  }: SignupDto): Promise<User> {
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      throw new BadRequestException('Invalid email format');
    }

    const existingUser = await this.userRepository.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      throw new BadRequestException('Username or email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User(
      username,
      email,
      hashedPassword,
      firstName,
      lastName,
    );
    newUser.isVerifiedEmail = true;
    await this.userRepository.insert(newUser);
    delete newUser.password;
    return newUser;
  }

  async login(
    loginDto: LoginDto,
  ): Promise<{ accessToken: string; refreshToken: string } | null> {
    const user = await this.userRepository.findOne({
      username: loginDto.username,
    });
    if (!user) {
      return null;
    }
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      return null;
    }
    const accessToken = await this.generateJwtToken(user);
    const refreshToken = this.generateRefreshToken();
    const result = await this.userRepository.nativeUpdate(
      {
        id: user.id,
      },
      { refreshToken },
    );

    return { accessToken, refreshToken };
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto): Promise<string | null> {
    // Validate the refresh token from the database
    const user = await this.userRepository.findOne({
      refreshToken: refreshTokenDto.refreshToken,
    });
    if (!user) {
      return null;
    }

    // Verify that the provided access token matches the stored access token
    const payload = this.jwtService.verify(refreshTokenDto.accessToken, {
      secret: this.getJwtSecret(),
    });
    if (payload.sub !== user.id) {
      throw new UnauthorizedException('Invalid access token');
    }

    // Generate a new access token
    const accessToken = this.generateJwtToken(user);
    return accessToken;
  }

  private generateJwtToken(user: User): string {
    const payload = { username: user.username, sub: user.id };
    return this.jwtService.sign(payload, {
      expiresIn: '14d',
      secret: this.getJwtSecret(),
    });
  }

  private generateRefreshToken(): string {
    const refreshTokenLength = 20;
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let refreshToken = '';
    for (let i = 0; i < refreshTokenLength; i++) {
      refreshToken += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    return refreshToken;
  }

  private getJwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET');
  }
}
