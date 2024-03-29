// cluster.service.ts
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { Cluster, Genres } from 'src/entities';
import { CreateClusterDto, UpdateClusterDto, ClusterDto } from 'src/dtos';

@Injectable()
export class ClusterService {
  constructor(
    @InjectRepository(Cluster)
    private readonly clusterRepository: EntityRepository<Cluster>,
    @InjectRepository(Genres)
    private readonly genresRepository: EntityRepository<Genres>,
  ) {}

  async findAll(): Promise<ClusterDto[]> {
    const clusters = await this.clusterRepository.findAll();
    return clusters.map((cluster) => ({
      id: cluster.id,
      name: cluster.name,
      genresId: cluster.genres.id,
    }));
  }

  async findOne(id: string): Promise<ClusterDto> {
    const cluster = await this.clusterRepository.findOne(id);
    if (!cluster) throw new NotFoundException('Cluster not found');
    return { id: cluster.id, name: cluster.name, genresId: cluster.genres.id };
  }

  async create(clusterData: CreateClusterDto): Promise<ClusterDto> {
    const genre = await this.genresRepository.findOne(clusterData.genresId);
    if (!genre) throw new BadRequestException('Genre is not existed!');
    const cluster = new Cluster(clusterData.name, genre); // Assuming Cluster entity constructor accepts partial data
    await this.clusterRepository.insert(cluster);
    return { id: cluster.id, name: cluster.name, genresId: cluster.genres.id };
  }

  async update(id: string, clusterData: UpdateClusterDto): Promise<ClusterDto> {
    const cluster = await this.clusterRepository.findOne(id);
    if (!cluster) {
      throw new Error('Cluster not found');
    }
    await this.clusterRepository.nativeUpdate(id, clusterData);
    return {
      id: cluster.id,
      name: cluster.name,
      genresId: cluster.genres.id,
      ...clusterData,
    };
  }

  async remove(id: string): Promise<void> {
    const cluster = await this.clusterRepository.findOne(id);
    if (!cluster) {
      throw new Error('Cluster not found');
    }
    await this.clusterRepository.nativeDelete(cluster);
  }
}
