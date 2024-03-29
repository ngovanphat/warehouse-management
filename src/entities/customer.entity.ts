// customer.entity.ts
import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Contact } from './contact.entity';

@Entity()
export class Customer {
  @PrimaryKey()
  id!: string;

  @ManyToOne(() => Contact, {
    referenceColumnName: 'id',
    joinColumn: 'contact_id',
  })
  contact!: Contact;

  @Property()
  @Property()
  debt!: number;
}
