import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, NotFoundError } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { CustomerDto } from 'src/dtos';
import { Contact, Customer } from 'src/entities';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: EntityRepository<Customer>,
    @InjectRepository(Contact)
    private readonly contactRepository: EntityRepository<Contact>,
  ) {}

  async findAll(): Promise<CustomerDto[]> {
    const customers = await this.customerRepository
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.contact', 'contact')
      .getResult();
    return customers;
  }

  async findOne(id: string): Promise<CustomerDto> {
    const customer = await this.customerRepository
      .createQueryBuilder('c')
      .leftJoin('c.contact', 'contact')
      .where({ id: { $eq: id } }, '$and')
      .select(['c.*', 'contact.*'])
      .getSingleResult();
    if (!customer) throw new NotFoundError('Customer not found');

    return customer;
  }
}
