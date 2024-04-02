import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, MikroORM, NotFoundError } from '@mikro-orm/core';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable, ConflictException } from '@nestjs/common';
import { CustomerDto, CreateCustomerDto, UpdateCustomerDto } from 'src/dtos';
import { Contact, Customer } from 'src/entities';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: EntityRepository<Customer>,
    @InjectRepository(Contact)
    private readonly contactRepository: EntityRepository<Contact>,
    private readonly em: EntityManager,
    private readonly orm: MikroORM,
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
      .leftJoinAndSelect('c.contact', 'contact')
      .where({ id: { $eq: id } }, '$and')
      .getSingleResult();
    if (!customer) throw new NotFoundError('Customer not found');

    return customer;
  }

  async create(data: CreateCustomerDto): Promise<Customer> {
    const isContactExist = await this.customerRepository
      .createQueryBuilder('c')
      .leftJoin('c.contact', 'contact')
      .where({ 'contact.phoneNumber': { $eq: data.phoneNumber } }, '$and')
      .select(['c.*', 'contact.*'])
      .getSingleResult();
    if (isContactExist)
      throw new ConflictException('Customer is already existed!');
    let customer = null;
    if (isContactExist) {
      customer = new Customer({ contact: isContactExist, debt: 0 });
      await this.customerRepository.insert(customer);
    } else {
      try {
        await this.em.begin();
        const contact = new Contact({ ...data });
        customer = new Customer({
          contact,
          debt: 0,
        });
        await this.contactRepository.insert(contact);
        await this.customerRepository.insert(customer);
        await this.em.commit();
      } catch (e) {
        await this.em.rollback();
        throw e;
      }
    }

    return customer;
  }

  async update(id: string, data: UpdateCustomerDto): Promise<CustomerDto> {
    const customer = await this.customerRepository
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.contact', 'contact')
      .where({ 'c.id': { $eq: id } }, '$and')
      .getSingleResult();
    if (!customer) throw new NotFoundError('Customer not found!');
    const { debt, ...contactInfo } = data;
    try {
      await this.em.begin();
      if (debt)
        await this.customerRepository.nativeUpdate(id, {
          debt,
        });
      if (
        contactInfo.firstName ||
        contactInfo.lastName ||
        contactInfo.email ||
        contactInfo.phoneNumber
      )
        await this.contactRepository.nativeUpdate(customer.id, contactInfo);

      await this.em.commit();

      return {
        ...customer,
        debt,
        contact: {
          ...customer.contact,
          ...contactInfo,
        },
      };
    } catch (e) {
      await this.em.rollback();
      throw e;
    }
  }
}
