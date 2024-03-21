// import_product.entity.ts
import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Contact } from './contact.entity';

@Entity()
export class ImportProduct {
  @PrimaryKey()
  id!: string;

  @Property()
  total_price!: number;

  @Property()
  import_time!: Date;

  @ManyToOne(() => Contact)
  contact!: Contact;

  @Property()
  payment_account_number?: string;

  @Property()
  payment_account_name?: string;

  @Property()
  payment_account_bank_name?: string;

  @Property()
  payment_method?: string;

  @Property()
  is_complete_payment!: boolean;

  @Property()
  complete_payment_time?: Date;
}
