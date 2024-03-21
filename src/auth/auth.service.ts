import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import * as bcrypt from 'bcryptjs';

import { User } from '../entities/user.entity';
import { SignupDto } from 'src/dtos/signup.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/dtos/login.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly jwtService: JwtService,
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

  async login(loginDto: LoginDto): Promise<string | null> {
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
    return this.generateJwtToken(user);
  }

  private generateJwtToken(user: User): string {
    const payload = { username: user.username, sub: user.id };
    return this.jwtService.sign(payload, '12213', { expiresIn: '14d' });
  }
}
