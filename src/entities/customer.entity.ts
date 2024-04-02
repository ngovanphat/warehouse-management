// customer.entity.ts
import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Contact } from './contact.entity';
import { v4 as uuid } from 'uuid';

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

  constructor({ contact, debt }: { contact: Contact; debt: number }) {
    this.contact = contact;
    this.debt = debt;
    this.id = uuid();
  }
}
