// cluster.entity.ts
import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Genres } from './genres.entity';

@Entity()
export class Cluster {
  @PrimaryKey()
  id!: string;

  @Property()
  name!: string;

  @ManyToOne(() => Genres)
  genres!: Genres;
}
