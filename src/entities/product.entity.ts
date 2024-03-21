// product.entity.ts
import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Brand } from './brand.entity';
import { Cluster } from './cluster.entity';

@Entity()
export class Product {
  @PrimaryKey()
  id!: string;

  @Property()
  name!: string;

  @ManyToOne(() => Brand)
  brand!: Brand;

  @Property()
  quantity!: number;

  @Property()
  images?: string;

  @ManyToOne(() => Cluster)
  cluster!: Cluster;

  @Property()
  price!: number;

  @Property({ columnType: 'text' })
  detail?: string;
}
