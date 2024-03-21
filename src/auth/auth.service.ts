import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { User } from '../entities/user.entity';
import { UserSignUpDto } from 'src/dtos/user-signup.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  async signUp({
    username,
    email,
    firstName,
    lastName,
    password,
  }: UserSignUpDto): Promise<User> {
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      throw new BadRequestException('Invalid email format');
    }

    // Check password format (add more checks as needed)
    if (password.length < 6) {
      throw new BadRequestException(
        'Password must be at least 6 characters long',
      );
    }

    const existingUser = await this.userRepository.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      throw new BadRequestException('Username or email already exists');
    }

    const newUser = new User(username, email, password, firstName, lastName);

    const numberOfCreated = await this.userRepository.insert(newUser);
    return newUser;
  }
}
