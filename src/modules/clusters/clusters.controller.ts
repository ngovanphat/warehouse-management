// cluster.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  InternalServerErrorException,
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
import { ClusterService } from './clusters.service';
import { CreateClusterDto, UpdateClusterDto, ClusterDto } from 'src/dtos';

@Controller('cluster')
@ApiTags('Clusters')
@ApiBearerAuth()
export class ClustersController {
  constructor(private readonly clusterService: ClusterService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List of clusters retrieved successfully',
    type: ClusterDto,
    isArray: true,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Something went wrong!' })
  async findAll(): Promise<ClusterDto[]> {
    try {
      const clusters = await this.clusterService.findAll();
      return clusters;
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong!');
    }
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Cluster retrieved successfully',
    type: ClusterDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Cluster not found' })
  @ApiResponse({ status: 500, description: 'Something went wrong!' })
  async findOne(@Param('id') id: string): Promise<ClusterDto> {
    try {
      const cluster = await this.clusterService.findOne(id);
      return cluster;
    } catch (e) {
      if (e instanceof NotFoundException)
        throw new NotFoundException(e.message);
      throw new InternalServerErrorException(e.message);
    }
  }

  @Post()
  async create(@Body() clusterData: CreateClusterDto): Promise<ClusterDto> {
    return await this.clusterService.create(clusterData);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() clusterData: UpdateClusterDto,
  ): Promise<ClusterDto> {
    return await this.clusterService.update(id, clusterData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.clusterService.remove(id);
  }
}
