// src/genres/genres.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

import {
  ApiTags,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { Genres } from 'src/entities';
import { GenresDto, CreateGenreDto } from 'src/dtos';
import { GenresService } from './genres.service';

@Controller('genres')
@ApiTags('Genres')
@ApiBearerAuth()
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List of genres retrieved successfully',
    type: GenresDto,
    isArray: true,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Server error' })
  async findAll(): Promise<GenresDto[]> {
    try {
      return this.genresService.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong!');
    }
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Genre retrieved successfully',
    type: GenresDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Genre not found' })
  @ApiResponse({ status: 500, description: 'Server error' })
  async findOne(@Param('id') id: string): Promise<GenresDto> {
    try {
      return this.genresService.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong!');
    }
  }

  @Post()
  @ApiBody({ type: CreateGenreDto })
  @ApiResponse({
    status: 201,
    description: 'Genre created successfully',
    type: GenresDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Server error' })
  async create(@Body() data: Partial<Genres>): Promise<GenresDto> {
    try {
      return this.genresService.create(data);
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong!');
    }
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
