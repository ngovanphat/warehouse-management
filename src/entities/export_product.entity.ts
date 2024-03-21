// export_product.entity.ts
import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Customer } from './customer.entity';

@Entity()
export class ExportProduct {
  @PrimaryKey()
  id!: string;

  @Property()
  total_price!: number;

  @Property()
  export_time!: Date;

  @ManyToOne(() => Customer)
  customer!: Customer;

  @Property()
  is_complete_payment!: boolean;

  @Property()
  complete_payment_time?: Date;
}
