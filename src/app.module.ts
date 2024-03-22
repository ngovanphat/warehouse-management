import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { JwtModule } from '@nestjs/jwt';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { JwtMiddleware } from './middlewares/jwt.middleware';

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
      secretOrPrivateKey: process.env.JWT_SECRET,
      signOptions: { expiresIn: '14d' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).exclude('/auth').forRoutes('*');
  }
}
