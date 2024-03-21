// customer.entity.ts
import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Contact } from './contact.entity';

@Entity()
export class Customer {
  @PrimaryKey()
  id!: string;

  @ManyToOne(() => Contact)
  contact!: Contact;

  @Property()
  debt!: number;
}
