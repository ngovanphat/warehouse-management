import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Cluster, Genres } from 'src/entities';
import { ClusterService } from './clusters.service';
import { ClustersController } from './clusters.controller';

@Module({
  imports: [MikroOrmModule.forFeature([Cluster, Genres])],
  providers: [ClusterService],
  controllers: [ClustersController],
})
export class ClustersModule {}
