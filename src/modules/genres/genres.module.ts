import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Genres } from 'src/entities';

import { GenresController } from './genres.controller';
import { GenresService } from './genres.service';

@Module({
  imports: [MikroOrmModule.forFeature([Genres])],
  controllers: [GenresController],
  providers: [GenresService],
})
export class GenresModule {}
