// genres.entity.ts
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Genres {
  @PrimaryKey()
  id!: string;

  @Property()
  name!: string;
}
