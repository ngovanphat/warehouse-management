import { Module } from '@nestjs/common';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
@Module({
  imports: [
    MikroOrmModule.forRoot({
      driver: PostgreSqlDriver,
      host: 'localhost',
      user: 'postgres',
      dbName: 'product_management',
      password: 's@S11111',
      port: 5433,
      debug: true,
      autoLoadEntities: true,
      // entities: [User],
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
