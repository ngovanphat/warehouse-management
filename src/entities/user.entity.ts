// user.entity.ts
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class User {
  @PrimaryKey()
  id!: number;

  @Property()
  username!: string;

  @Property()
  email!: string;

  @Property()
  password!: string;

  @Property({ nullable: true, name: 'first_name' })
  firstName?: string;

  @Property({ nullable: true, name: 'last_name' })
  lastName?: string;

  @Property({ nullable: true, name: 'phone_number' })
  phoneNumber?: string;

  @Property({ nullable: true, name: 'is_verified_email' })
  isVerifiedEmail!: boolean;

  @Property({ nullable: true, name: 'refresh_token' })
  refreshToken?: string;

  constructor(
    username: string,
    email: string,
    password: string,
    firstName?: string,
    lastName?: string,
  ) {
    this.username = username;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
  }
}
