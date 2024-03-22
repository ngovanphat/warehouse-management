// genres.entity.ts
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuid } from 'uuid';
@Entity()
export class Genres {
  @PrimaryKey()
  id!: string;

  @Property()
  name!: string;

  constructor(name: string) {
    this.id = uuid(); // Assuming you're using a UUID library like 'uuid' to generate UUIDs
    this.name = name;
  }
}
