// contact.entity.ts
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuid } from 'uuid';

@Entity()
export class Contact {
  @PrimaryKey()
  id!: string;

  @Property()
  firstName?: string;

  @Property()
  lastName?: string;

  @Property()
  phoneNumber?: string;

  @Property()
  email?: string;

  constructor({
    firstName,
    lastName,
    phoneNumber,
    email,
  }: {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    email?: string;
  }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.id = uuid();
  }
}
