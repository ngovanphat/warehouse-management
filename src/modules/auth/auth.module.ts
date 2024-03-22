import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../../entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MikroOrmModule.forFeature([User]), JwtModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
