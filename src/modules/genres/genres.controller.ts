// src/genres/genres.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { GenresService } from './genres.service';
import { Genres } from 'src/entities';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get()
  async findAll(): Promise<Genres[]> {
    return this.genresService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Genres> {
    return this.genresService.findOne(id);
  }

  @Post()
  async create(@Body() data: Partial<Genres>): Promise<Genres> {
    return this.genresService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<Genres>,
  ): Promise<Genres> {
    const isUpdate = await this.genresService.update(id, data);
    return { id, ...data } as Genres;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<number> {
    return this.genresService.remove(id);
  }
}
