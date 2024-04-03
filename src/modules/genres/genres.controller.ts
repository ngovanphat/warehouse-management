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
  NotFoundException,
} from '@nestjs/common';

import {
  ApiTags,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
  ApiOperation,
} from '@nestjs/swagger';

import { Genres } from 'src/entities';
import { GenresDto, CreateGenreDto, UpdateGenreDto } from 'src/dtos';
import { GenresService } from './genres.service';

@Controller('genres')
@ApiTags('Genres')
@ApiBearerAuth()
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all genres',
  })
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
  @ApiOperation({
    summary: 'Get a genre by ID',
  })
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
  @ApiOperation({
    summary: 'Create a genre',
  })
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
  @ApiOperation({ summary: 'Update genre by ID' })
  @ApiParam({
    name: 'id',
    description: 'Genre ID',
    type: 'string',
    required: true,
  })
  @ApiBody({ type: UpdateGenreDto })
  @ApiResponse({
    status: 200,
    description: 'The genre has been successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Invalid genre data provided.' })
  @ApiResponse({ status: 404, description: 'Genre not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async update(
    @Param('id') id: string,
    @Body() data: Partial<Genres>,
  ): Promise<Genres> {
    try {
      const isUpdate = await this.genresService.update(id, data);
      return { id, ...data } as Genres;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Genre not found.');
      } else {
        throw new InternalServerErrorException('Internal server error.');
      }
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete genre by ID' })
  @ApiParam({
    name: 'id',
    description: 'Genre ID',
    type: 'string',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'The genre has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Genre not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async remove(@Param('id') id: string): Promise<number> {
    try {
      return await this.genresService.remove(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Genre not found.');
      } else {
        throw new InternalServerErrorException('Internal server error.');
      }
    }
  }
}
