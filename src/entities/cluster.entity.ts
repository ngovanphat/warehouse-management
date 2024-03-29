// cluster.entity.ts
import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Genres } from './genres.entity';
import { v4 as uuid } from 'uuid';

@Entity()
export class Cluster {
  @PrimaryKey()
  id!: string;

  @Property()
  name!: string;

  @ManyToOne(() => Genres)
  genres?: Genres;

  constructor(name: string, genre: Genres) {
    this.id = uuid(); // Assuming you're using a UUID library like 'uuid' to generate UUIDs
    this.name = name;
    this.genres = genre;
  }
}
