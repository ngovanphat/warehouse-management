// brand.entity.ts
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Brand {
  @PrimaryKey()
  id!: string;

  @Property()
  name!: string;

  @Property()
  logo?: string;
}
