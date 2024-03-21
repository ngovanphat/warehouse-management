// contact.entity.ts
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

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
}
