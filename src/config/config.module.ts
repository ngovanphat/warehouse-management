// config.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true, // Make the configuration module global
    }),
  ],
  exports: [NestConfigModule],
})
export class ConfigModule {}
