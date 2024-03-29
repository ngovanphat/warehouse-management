import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Contact } from 'src/entities';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: EntityRepository<Contact>,
  ) {}

  async findAll(): Promise<Contact[]> {
    return this.contactRepository.findAll();
  }

  async findOne(id: string): Promise<Contact> {
    const contact = await this.contactRepository.findOne(id);
    if (!contact) throw new NotFoundException('Contact is not found!');
    return contact;
  }

  async create(data: Partial<Contact>): Promise<Contact> {
    const contact = new Contact({ ...data });
    await this.contactRepository.insert(contact);
    return contact;
  }

  async update(id: string, data: Partial<Contact>): Promise<Contact> {
    const oldContact = await this.contactRepository.findOne(id);
    if (!oldContact) throw new NotFoundException('Contact not found!');
    await this.contactRepository.nativeUpdate(id, data);
    return { ...oldContact, ...data };
  }

  async remove(id: string): Promise<number> {
    return await this.contactRepository.nativeDelete(id);
  }
}
