import { Module } from '@nestjs/common';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from './config/config.module';
@Module({
  imports: [
    ConfigModule,
    MikroOrmModule.forRoot({
      driver: PostgreSqlDriver,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      dbName: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: +process.env.DB_PORT,
      debug: true,
      autoLoadEntities: true,
      // entities: [User],
    }),
    AuthModule,
    JwtModule.register({
      secret: '12213',
      signOptions: { expiresIn: '14d' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
